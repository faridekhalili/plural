var plural = require('./index')
    , assert = require('assert')

describe('Augmented tests', () => {
    beforeEach(() => {
        // reset the plural object to remove any added rules.
        plural = require('./index')
    });

    it('Sample 10', () => {
        /**
         * StringLiteral
         * index.js:60:45
         * -     'alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic',
         * +     'alm', 'fece', 'bowel', 'sud', 'entrail', \"\", 'outskirt', 'odd', 'tropic',
         */
        assert.equal(plural('S'), 'Ses')
    });
});