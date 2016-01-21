var fs = require("fs");

module.exports = function () {
    return {
        description: "This component receives a file path on a single input port and sends the file contents out to the output port.",

        inPorts: {
            "source": {
                datatype: 'string',
                onData: (component, data) => {
                    component.outPorts['out'].send(fs.readFileSync(data, { encoding: 'utf8' }));
                }
            }
        },
        
        outPorts: {
            "out": { datatype: 'string' }
        }
    };
};