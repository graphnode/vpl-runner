var runner = require('./lib/runner');

var args = process.argv.slice(2);

if (args.length !== 0) {
    var filename = args[0];
    runner(filename);
} else {
    console.error('A parameter with the graph file path is required.');
    process.exit(1);
}
