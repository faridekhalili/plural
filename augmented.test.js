var plural = require('./index')
    , assert = require('assert')

describe('Augmented tests', () => {
    beforeEach(() => {
        // reset the plural object to remove any added rules.
        plural = require('./index')
    });

    it('Sample 9', () => {
        /**
         * ConditionalExpression
         * index.js:76:7
         * -     if (num !== 1 || num === undefined) {
         * +     if (true) {
         */
        assert.equal(plural('toad', 1), 'toad')
    });
});