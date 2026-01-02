var plural = require('./index')
    , assert = require('assert')

describe('Augmented tests', () => {
    beforeEach(() => {
        // reset the plural object to remove any added rules.
        plural = require('./index')
    });

    it("Sample 6", () => {
        /**
         * Regex
         * index.js:27:9
         * -   addRule(/[aeiouy]o$/i, function(w) { return w + 's' });
         * +   addRule(/[aeiouy]o/i, function(w) { return w + 's' });
         */
        assert.equal(plural('peony'), 'peonies')
    });
});