/**
 * Unit tests
 */

 // Dependencies
const assert = require("assert");
const lib = require("./../app/lib");

// Container for the unit tests
const unit = {};

unit["lib.getANumber should return 1"] = async _ => {
    const value = lib.getANumber();
    assert.equal(value, 1);
    return;
};

unit["lib.echo should return the input"] = async _ => {
    const arg = "hello there!";
    const value = lib.echo(arg);
    assert.equal(value, arg);
    return;
};

unit["lib.convertToInt should convert '42' to 42"] = async _ => {
    const value = lib.echo("42");
    assert.equal(value, 42);
    return;
};

unit["lib.convertToInt should throw if argument can't be parsed"] = async _ => {
    assert.throws(() => {
        lib.convertToInt("!");
    }, Error);
    return;
};

unit["Example of failing test: lib.convertToInt throws unexpectedly"] = async _ => {
    assert.doesNotThrow(() => {
        lib.convertToInt("!");
    }, Error);
    return;
};

// Export the unit tests
module.exports = unit;