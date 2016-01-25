var http = require('http');

module.exports = function () {
    return {
        description: "This component sends the current public ip to the out port at the start of the graph.",
        
        onStart: function(component, callback) {
            http.get('http://api.ipify.org', (res) => {
                res.setEncoding('utf8');
                res.on("data", function(chunk) {
                    component.outPorts['out'].send(chunk || null);
                    callback();
                });
            }).on('error', (e) => {
                component.outPorts['out'].send(null);
                callback();
            });
        },
        
        outPorts: {
            "out": { datatype: 'string' }
        }
    };
};