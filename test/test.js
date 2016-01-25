var assert = require('assert'),
    runner = require('../lib/runner');

describe('Runner', function () {
    describe('Count Lines Graph', function () {
        it('should not throw an error running the basic count lines graph', function (done) {
            runner('./test/count_lines.json', done);
        });
    });
    
    describe('Bad Graph', function () {
        it('should throw an error for invalid graph', function (done) {
            runner('./test/bad_graph.json', function(err) {
                assert.throws(() => assert.ifError(err), /Error while validating graph/);
                done();
            });
        });
    });
    
    describe('Unconnected Port', function () {
        it('should lose some data', function (done) {
            runner('./test/lose_data.json', done);
        });
    });
    
    describe('Missing port Graph', function () {
        it('should throw an error for missing port', function (done) {
            runner('./test/no_port.json', function(err) {
                assert.throws(() => assert.ifError(err), /missing for port/);
                done();
            });
        });
    });
    
    describe('Simple Graph to get Ip', function () {
        it('run process without input', function (done) {
            runner('./test/print_ip.json', done);
        });
    });
});