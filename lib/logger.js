var winston = require('winston');

var logger = new (winston.Logger)();
logger.add(winston.transports.Console, { prettyPrint: true });

module.exports = logger;