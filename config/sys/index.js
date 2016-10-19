"use strict";

var System = require('systemjs');
require('./server.js');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Make an System module for Mongoose
System.set('mongoose', System.newModule({
  default: mongoose
}));

System.config({
  paths: {
    'npm:': 'node_modules/'
  },
  map: {
    app: 'server/server',
    lodash: 'npm:lodash/lodash.js'
  },
  packages: {
    lodash: { defaultExtension: 'js' }
  }
});

System.import('app').catch(function (err) {
  console.error(err);
});
