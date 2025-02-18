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

    it('Sample 2', () => {
        /**
         * ConditionalExpression
         * index.js:33:7
         * -     if (w === 'dwarf' || w === 'roof') {
         * +     if (false) {
         */
        assert.equal(plural('dwarf'), 'dwarfs')
    });

    // ABANDONED, SUSPECTED EQUIVALENT.
    // it('Sample 3', () => {
    //     /**
    //      * ArrayDeclaration
    //      * index.js:3:13
    //      * -   var rules = []
    //      * +   var rules = [\"Stryker was here\"]
    //      */
    //     assert.equal(plural('Stryker was here', 0), 'Stryker was heres')
    // });

    it('Sample 4', () => {
        /**
         * Regex
         * index.js:19:9
         * -   addRule(/x$|ch$|s$/i, function(w) { return w + 'es' })
         * +   addRule(/x|ch$|s$/i, function(w) { return w + 'es' })
         */
        assert.equal(plural('example'), 'examples')
    });

    // Kills mutant but also kills original. Original code gives 's' as plural of empty string.
    it('Sample 5', () => {
        /**
         * StringLiteral
         * index.js:33:13
         * -     if (w === 'dwarf' || w === 'roof') {
         * +     if (w === \"\" || w === 'roof') {
         */
        assert.equal(plural(''), '')
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

    // ABANDONED, suspected equivalent as the catch-all case adds an "s" to the end anyway.
    // it('Sample 8', () => {
    //     /**
    //      * Regex
    //      * index.js:27:9
    //      * -   addRule(/[aeiouy]o$/i, function(w) { return w + 's' });
    //      * +   addRule(/[^aeiouy]o$/i, function(w) { return w + 's' });
    //      */
    //     assert.equal(plural('zoo'), 'zoos')
    // });

    it('Sample 9', () => {
        /**
         * ConditionalExpression
         * index.js:76:7
         * -     if (num !== 1 || num === undefined) {
         * +     if (true) {
         */
        assert.equal(plural('toad', 1), 'toad')
    });

    // EQUIVALENT MUTANT, the fallback behavior of adding 's' if there is no specific rule takes
    // care of "electronic" -> "electronics".
    it('Sample 10', () => {
        /**
         * StringLiteral
         * index.js:60:45
         * -     'alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic',
         * +     'alm', 'fece', 'bowel', 'sud', 'entrail', \"\", 'outskirt', 'odd', 'tropic',
         */
        assert.equal(plural('electronic'), 'electronics');
    });
});