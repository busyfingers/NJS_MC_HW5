/**
 * Unit tests
 */

const assert = require("assert");
const lib = require("./../app/lib");

const unit = {};

unit['lib.getANumber should return 1'] = done => {
    const value = lib.getANumber();
    assert.equal(value, 1);
    done();
};

module.exports = unit;