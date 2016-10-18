import * as _ from 'lodash';

import {defaultAssets} from './assets/default';
import {defaultConfig} from './env/default';

import {devAssets} from './assets/development';
import {prodAssets} from './assets/production';
import {testAssets} from './assets/test';
import {devEnv} from './env/development';
import {prodEnv} from './env/production';
import {testEnv} from './env/test';


let  chalk = require('chalk'),
  glob = require('glob'),
  fs = require('graceful-fs'),
  path = require('path'),
  System = require('systemjs');

/**
 * Get files by glob patterns
 */
function getGlobbedPaths(globPatterns, excludes?) {
  // URL paths regex
  let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  let output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (let i in excludes) {
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
};


/**
 * Initialize global configuration files
 */
function initGlobalConfigFiles(config, assets) {
  // Appending files
  config.files = {
    server: {},
    client: {}
  };

  // Setting Globbed model files
  config.files.server.models = getGlobbedPaths(assets.server.models);

  // Setting Globbed route files
  config.files.server.routes = getGlobbedPaths(assets.server.routes);

  // Setting Globbed socket files
  // config.files.server.sockets = getGlobbedPaths(assets.server.sockets);

  // Setting Globbed js files
  config.files.client.js = getGlobbedPaths(assets.client.dist.js, 'client/').concat(getGlobbedPaths(assets.client.js, ['client/']));

  // Setting Globbed css files
  config.files.client.css = getGlobbedPaths(assets.client.dist.css, 'client/').concat(getGlobbedPaths(assets.client.css, ['client/']));
};

function init() {

  let environmentAssets;
  let environmentConfig;

  if (process.env.NODE_ENV === 'development') {
    environmentAssets = devAssets;
    environmentConfig = devEnv;
  }
  else if (process.env.NODE_ENV === 'production') {
    environmentAssets = prodAssets;
    environmentConfig = prodEnv;
  }
  else {
    environmentAssets = testAssets;
    environmentConfig = testEnv;
  }

  // Merge assets
  let assets = _.merge(defaultAssets, environmentAssets);

  // Merge config files
  let config = _.merge(defaultConfig, environmentConfig);

  // Initialize global globbed files
  initGlobalConfigFiles(config, assets);

  return {
    config: config,
    assets: assets
  };
};

export {init as config};
