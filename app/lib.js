/**
 * Sample library with various functions called by the test runner
 */

// Dependencies
const http = require("http");

// Container for the library functions
const lib = {};

lib.getANumber = _ => {
    return 1;
};

lib.echo = value => {
    return value;
};

lib.convertToInt = value => {
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
        return parsedValue;
    } else {
        throw Error(`Cannot parse ${value} as an integer`);
    }
};

// Calls a specified URL using HTTP and returns true if any response was received (regardless of status code)
lib.callAUrl = url => {
    const reqOptions = {
        "protocol": "http:",
        "hostname": url,
        "port": 80,
        "method": "GET"
    };

    // Wrap the request in a promise so that callers can use 'await' or chain a call to 'then'
    return new Promise((resolve, reject) => {
        const req = http.request(reqOptions, res => {
            resolve(res);
        });

        req.on("error", err => {
            reject(err);
        });

        req.end();
    });
};

// Export the library
module.exports = lib;