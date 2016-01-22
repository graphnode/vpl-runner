var runner = require('./lib/runner'),
    logger = require('./lib/logger');
    
var args = process.argv.slice(2);

if (args.length !== 0) {
    var filename = args[0];
    runner(filename);
} else {
    logger.error('A parameter with the graph file path is required.');
    process.exit(1);
}
