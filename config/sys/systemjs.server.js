'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Make an System module for Mongoose
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
