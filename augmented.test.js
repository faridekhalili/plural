var plural = require('./index')
    , assert = require('assert')

describe('Augmented tests', () => {
    beforeEach(() => {
        // reset the plural object to remove any added rules.
        plural = require('./index')
    });

    it('Sample 1', () => {
        /**
         * BlockStatement\nindex.js:108:8
         * -     else {
         * -       throw new Error('Unable to add plural function to String object')
         * -     }
         * +     else {}
         */
        String.prototype.plural = 'foo'
        try {
            plural.monkeyPatch();
            assert.fail("Expected error was never thrown");
        } catch (error) {
            assert.equal(error.message, 'Unable to add plural function to String object');
        }
    });
});