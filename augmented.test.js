var plural = require('./index')
    , assert = require('assert')

describe('Augmented tests', () => {
    beforeEach(() => {
        // reset the plural object to remove any added rules.
        plural = require('./index')
    });

    it('Sample 2', () => {
        /**
         * ConditionalExpression
         * index.js:33:7
         * -     if (w === 'dwarf' || w === 'roof') {
         * +     if (false) {
         */
        assert.equal(plural('dwarf'), 'dwarfs')
    });
});