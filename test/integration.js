/**
 * Integration tests
 */
 
 // Dependencies
 const assert = require("assert");
 const lib = require("./../app/lib");

// Container for the integration tests
const integration = {};

integration["lib.callAUrl returns the response"] = async _ => {
    const reqResult = await lib.callAUrl("www.google.com");
    assert.ok(reqResult);
    return;
};

// Export the tests
module.exports = integration;