var plural = require('./index')
    , assert = require('assert')

describe('Augmented tests', () => {
    beforeEach(() => {
        // reset the plural object to remove any added rules.
        plural = require('./index')
    });
    it('Sample 7', () => {
        /**
         * ConditionalExpression
         * index.js:84:16
         * -           return type(rule[1]) === 'Function' ? rule[1](word) : rule[1]
         * +           return false ? rule[1](word) : rule[1]
         */
        plural.addRule('foo', () => 'fooi');
        assert.equal(plural('foo'), 'fooi');
    });
});