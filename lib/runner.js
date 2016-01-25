var fs = require('fs'),
    path = require('path'),
    tv4 = require('tv4'),
    async = require('async'),
    logger = require('./logger');

module.exports = function(filename, callback) {
    var schema = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'schemas/graph.schema.json'), { encoding: 'utf8' }));
    var graph = JSON.parse(fs.readFileSync(filename, { encoding: 'utf8' }));

    var result = tv4.validateResult(graph, schema);

    if (!result.valid) {
        callback(new Error('Error while validating graph: ' + result.error));
        return;
    }

    var processes = {};
    var payloads = [];

    var getTargetForPort = function(processName, portName) {
        var keys = Object.keys(graph.connections);
        for(var i = 0; i < keys.length; i++) {
            if (graph.connections[keys[i]].data !== undefined) {
                continue;
            }
            
            var connection = graph.connections[keys[i]];
            
            if (connection.src.process === processName && connection.src.port === portName) {
                return connection.tgt;
            }
        }
    };

    Object.keys(graph.processes).forEach(function(processName) {
        processes[processName] = graph.processes[processName];
        processes[processName].component = require(path.resolve(path.dirname(filename), processes[processName].component))();
        
        processes[processName].metadata = processes[processName].metadata || {};
        
        processes[processName].inPorts = {};
        Object.keys(processes[processName].component.inPorts || {}).forEach(function(portName) {
            processes[processName].inPorts[portName] = processes[processName].component.inPorts[portName];
        });
        
        processes[processName].outPorts = {};
        Object.keys(processes[processName].component.outPorts || {}).forEach(function(portName) {
            var tgt = getTargetForPort(processName, portName);
            processes[processName].outPorts[portName] = {
                send: function(data) {
                    if (tgt !== undefined) {
                        payloads.push({
                            data: data,
                            process: tgt.process,
                            port: tgt.port
                        });
                    } else {
                        logger.warn('Lost this data into the aether:', data)
                    }
                }
            }
        });
    });

    // Read initial payloads.
    Object.keys(graph.connections).forEach(function(key) {
        if (graph.connections[key].data === undefined) {
            return;
        }
        
        var connection = graph.connections[key];
        
        payloads.push({
            data: connection.data,
            process: connection.tgt.process,
            port: connection.tgt.port
        });
    });
    
    // Run onStart of all components.
    async.forEachOf(graph.processes, function(process, processName, cb) {
        var onStart = process.component.onStart;
        
        if (onStart !== undefined) {
            if (onStart.length <= 1) {
                onStart(process);
                async.setImmediate(cb);
            } else {
                onStart(process, cb);
            }
        } else {
            async.setImmediate(cb);
        }
    }, function() {
        
        // Run the graph while there are payloads.
        while(payloads.length !== 0) {
            var payload = payloads.shift();
            
            var onData = null;
            
            var port = processes[payload.process].component.inPorts[payload.port];
            
            if (port) {
                onData = processes[payload.process].component.inPorts[payload.port].onData;
            }

            if (onData) {
                onData(processes[payload.process], payload.data);
            } else {
                callback(new Error('OnData is missing for port ' + payload.port + ' in process ' + payload.process + '.'));
                return;
            }
        }
        
        async.setImmediate(callback);
    });
    
};
