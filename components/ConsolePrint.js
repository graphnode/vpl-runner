var logger = require('../lib/logger');

module.exports = function () {
    return {
        description: "This component receives a object and prints it on the console.",

        inPorts: {
            "in": { 
                datatype: 'all',
                onData: (component, data) => {
                    logger.info(data);
                }
            }
        }
    };
};