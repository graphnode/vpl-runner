module.exports = function () {
    return {
        description: "This component receives an object (array, string) on a single input port and sends the object length out to the output port.",

        inPorts: {
            "in": { 
                datatype: 'all',
                onData: (component, data) => {
                    component.outPorts['out'].send(data.length || NaN);
                }
            }
        },
        
        outPorts: {
            "out": { datatype: 'number' }
        }
    };
};