'use strict';

var _ = require('lodash'),
  chalk = require('chalk'),
  glob = require('glob'),
  fs = require('fs'),
  path = require('path');

var initGlobalConfig = function () {

	// Get the default assets
  	var defaultAssets = require(path.join(process.cwd(), 'config/assets/default'));

	// Get the current assets
	var environmentAssets = require(path.join(process.cwd(), 'config/assets/', process.env.NODE_ENV)) || {};

	// Merge assets
	var assets = _.merge(defaultAssets, environmentAssets);

    // Get the default config
    var defaultConfig = require(path.join(process.cwd(), 'config/env/default'));

    // Get the current config
    var environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

    // Merge config files
    var config = _.merge(defaultConfig, environmentConfig);

    return {
    	config: config,
    	assets: assets
    };
};

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();