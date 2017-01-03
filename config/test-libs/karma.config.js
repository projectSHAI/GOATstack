var webpackConfig = require('../webpack/webpack.common')({ env: 'karma' });

module.exports = function (config) {

  var _config = {
    basePath: '../../',

    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-chrome-launcher'),
      require('karma-mocha-reporter'),
      require('karma-jasmine-html-reporter'), // click "Debug" in browser to see it
      require('karma-htmlfile-reporter') // crashing w/ strange socket error
    ],

    customLaunchers: {
      // From the CLI. Not used here but interesting
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    files: [
      {pattern: './config/test-libs/karma-test-shim.js', watched: false}
    ],

    preprocessors: {
      './config/test-libs/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: "none"
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['kjhtml', 'mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  };

  config.set(_config);
};