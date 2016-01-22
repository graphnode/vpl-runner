var assert = require('assert'),
    runner = require('../lib/runner');

describe('Runner', function () {
    describe('Count Lines Graph', function () {
        it('should not throw an error running the basic count lines graph', function () {
            runner('./test/count_lines.json');
        });
    });
    
    describe('Bad Graph', function () {
        it('should throw an error for invalid graph', function () {
            assert.throws(() => {
                runner('./test/bad_graph.json');
            }, /Error while validating graph/);
        });
    });
    
    describe('Unconnected Port', function () {
        it('should lose some data', function () {
            runner('./test/lose_data.json');
        });
    });
    
    describe('Missing por Graph', function () {
        it('should throw an error for missing port', function () {
            assert.throws(() => {
                runner('./test/no_port.json');
            }, /missing for port/);
        });
    });
});