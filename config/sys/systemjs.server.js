'use strict';

var mongoose = require('mongoose');
let crypto = require('crypto');
let jsonwebtoken = require('jsonwebtoken');
let passport = require('passport');

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

System.set('glob', System.newModule({
  sync: require('glob').sync
}));

System.set('crypto', System.newModule({
  randomBytes: crypto.randomBytes,
  pbkdf2Sync: crypto.pbkdf2Sync,
  pbkdf2: crypto.pbkdf2
}));

System.set('jsonwebtoken', System.newModule({
  sign: jsonwebtoken.sign
}));

System.set('http', System.newModule({
  createServer: require('http').createServer
}));

System.set('https', System.newModule({
  createServer: require('https').createServer
}));

System.set('graceful-fs', System.newModule({
  readFileSync: require('graceful-fs').readFileSync
}));

System.set('chalk', System.newModule({
  bold: require('chalk').bold
}));

System.set('path', System.newModule({
  resolve: require('path').resolve
}));

System.set('passport', System.newModule({
  use: passport.use,
  authenticate: passport.authenticate,
  initialize: passport.initialize,

  _strategies: passport._strategies,
  _strategy: passport._strategy,
  _framework: passport._framework
}));

System.set('passport-local', System.newModule({
  Strategy: require('passport-local').Strategy
}));
