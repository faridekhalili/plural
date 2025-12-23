var plural = require('./index')
    , assert = require('assert')

describe('Augmented tests', () => {
    beforeEach(() => {
        // reset the plural object to remove any added rules.
        plural = require('./index')
    });

    it('Sample 4', () => {
        /**
         * Regex
         * index.js:19:9
         * -   addRule(/x$|ch$|s$/i, function(w) { return w + 'es' })
         * +   addRule(/x|ch$|s$/i, function(w) { return w + 'es' })
         */
        assert.equal(plural('example'), 'examples')
    });
});