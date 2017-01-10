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

var helpers = require('../helpers');


exports.config = {
  directConnect: true,

  // For angular tests
  useAllAngular2AppRoots: true,

  // Base URL for application server
  baseUrl: 'http://localhost:7001',

  // Spec patterns are relative to this config file
  specs: [
    helpers.root('e2e/*.e2e-spec.js')
  ],

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  allScriptsTimeout: 110000,

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    browser.get('');
    
    // SpecReporter
    var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  },

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 40000,
    print: function() {}
  }
};
