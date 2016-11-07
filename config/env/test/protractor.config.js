// FIRST TIME ONLY- run:
//   ./node_modules/.bin/webdriver-manager update
//
//   Try: `npm run webdriver:update`
//
// AND THEN EVERYTIME ...
//   1. Compile with `tsc`
//   2. Make sure the test server (e.g., http-server: localhost:8080) is running.
//   3. ./node_modules/.bin/protractor protractor.config.js
//
//   To do all steps, try:  `npm run e2e`

var fs = require('graceful-fs');
var path = require('canonical-path');
var _ = require('lodash');


exports.config = {
  directConnect: true,

  // For angular tests
  useAllAngular2AppRoots: true,

  // Base URL for application server
  baseUrl: 'http://localhost:7001',

  // The address of a running selenium server.
  // seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to this config file
  specs: ['../../../app-e2e/app.e2e-spec.js','../../../app-e2e/*.e2e-spec.js'],

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // doesn't seem to work.
  // resultJsonOutputFile: "foo.json",

  onPrepare: function () {
    // Clear current reporters
    jasmine.getEnv().clearReporters();
    //// SpecReporter
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));

    // debugging
    // console.log('browser.params:' + JSON.stringify(browser.params));

    global.sendKeys = sendKeys;

    // Allow changing bootstrap mode to NG1 for upgrade tests
    global.setProtractorToNg1Mode = function () {
      browser.useAllAngular2AppRoots = false;
      browser.rootEl = 'body';
    };
  },

  jasmineNodeOpts: {
    // defaultTimeoutInterval: 60000,
    defaultTimeoutInterval: 40000,
    showTiming: true,
    print: function () {}
  }
};

// Hack - because of bug with protractor send keys
function sendKeys(element, str) {
  return str.split('').reduce(function (promise, char) {
    return promise.then(function () {
      return element.sendKeys(char);
    });
  }, element.getAttribute('value'));
  // better to create a resolved promise here but ... don't know how with protractor;
}
