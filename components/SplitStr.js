module.exports = function () {
    return {
        description: "This component receives a string on a single input port and sends the string split in parts out to the output port.",

        onStart: (component) => {
            component.metadata.delimiter = ' ';
        },

        inPorts: {
            "in": { 
                datatype: 'string',
                onData: (component, data) => {
                    component.outPorts['out'].send(data.split(component.metadata.delimiter));
                }
            },
            "delimiter": { 
                datatype: 'string',
                onData: (component, data) => {
                   component.metadata.delimiter = data;
                }
            },
        },
        
        outPorts: {
            "out": { datatype: 'string' }
        }
    };
};