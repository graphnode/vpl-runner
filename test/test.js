var assert = require('assert'),
    runner = require('../lib/runner');

describe('Runner', function () {
    describe('Count Lines Graph', function () {
        it('should not throw an error running the basic count lines graph', function () {
            runner('./test/count_lines.json');
        });
    });
});