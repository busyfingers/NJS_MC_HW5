/*
 * Test runner
 *
 * Note: runTests(), which runs all tests, expects all test functions to return a promise
 */

// Override the NODE_ENV variable
process.env.NODE_ENV = 'testing';

// Application logic for the test runner
_app = {};

// Holder of all tests
_app.tests = {};

// Dependencies
_app.tests.unit = require('./unit');
_app.tests.integration = require('./integration');

// Run a single test and collect the results from it
_app.runTest = async (testCollection, testName) => {
    const performTest = _app.tests[testCollection][testName];
    const testResult = { testName };
    
    // Call the test
    try {
        await performTest();
        // If it calls back without throwing, then it succeeded, so log it in green
        console.log('\x1b[32m%s\x1b[0m', testName);
        testResult.successful = true;
        testResult.error = false;
    } catch (e) {
        // If it throws, then it failed, so capture the error thrown and log it in red
        console.log('\x1b[31m%s\x1b[0m', testName);
        testResult.successful = false;
        testResult.error = e;
    }
    return testResult;
};

// Run all the tests, collect the results and display a test report
_app.runTests = async _ => {
    const tests = [];

    Object.keys(_app.tests).forEach(key => {
        let subTests = _app.tests[key];
        Object.keys(subTests).forEach(testName => {
            tests.push(_app.runTest(key, testName));
        });
    });

    const results = await Promise.all(tests);
    _app.produceTestReport(results);
};

// Product a test outcome report
_app.produceTestReport = testResults => {
    const successes = testResults.filter(res => res.successful).length;
    const failures = testResults.length - successes;
    console.log("");
    console.log("--------BEGIN TEST REPORT--------");
    console.log("");
    console.log("Total Tests: ", testResults.length);
    console.log("Pass: ", successes);
    console.log("Fail: ", failures);
    console.log("");

    // If there are errors, print them in detail
    if (failures > 0) {
        console.log("--------BEGIN ERROR DETAILS--------");
        console.log("");
        testResults.filter(res => res.error).forEach(testResult => {
            console.log('\x1b[31m%s\x1b[0m', testResult.testName);
            console.log(testResult.error);
            console.log("");
        });
        console.log("");
        console.log("--------END ERROR DETAILS--------");
    }
    console.log("");
    console.log("--------END TEST REPORT--------");
    process.exit(0);
};

// Run the tests
_app.runTests();
