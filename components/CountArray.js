module.exports = function () {
    return {
        description: "This component receives a array on a single input port and sends the array length out to the output port.",

        inPorts: {
            "in": { 
                datatype: 'array',
                onData: (component, data) => {
                    component.outPorts['out'].send(data.length);
                }
            }
        },
        
        outPorts: {
            "out": { datatype: 'number' }
        }
    };
};