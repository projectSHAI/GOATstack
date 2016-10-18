"use strict";

var System = require('systemjs');
require('./server.js');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Make an abstract module for Mongoose
System.set('mongoose', System.newModule({
  Schema: mongoose.Schema,
  Document: mongoose.Document,
  Model: mongoose.Model,
  connection: mongoose.connection,

  connections: mongoose.connections,
  plugins: mongoose.plugins,
  models: mongoose.models,
  modelSchemas: mongoose.modelSchemas,
  options: mongoose.options,

  set: mongoose.set,
  get: mongoose.get,
  createConnection: mongoose.createConnection,
  connect: mongoose.connect,
  disconnect: mongoose.disconnect,
  model: mongoose.model,
  modelNames: mongoose.modelNames,

  _applyPlugins: mongoose._applyPlugins,
  plugin: mongoose.plugin,
  __defineGetter__: mongoose.__defineGetter__,
  __defineSetter__: mongoose.__defineSetter__
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
