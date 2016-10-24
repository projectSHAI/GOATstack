let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

import * as chalk from 'chalk';
import * as path from 'path';
import {config} from '../config';
let con = config();
let db;

// Load the mongoose models
export function loadModels(callback?) {
  // Globbing model files
  con.config.files.server.models.forEach(function (modelPath) {
    require(path.resolve(modelPath));
  });

  if (callback) callback();
};

// Initialize Mongoose
export function connect(cb?) {
  let db = mongoose.connect(con.config.db.uri, con.config.db.options, function (err) {
    // Log Error
    if (err) {
      console.error(chalk.bold.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {

      // Enabling mongoose debug mode if required
      mongoose.set('debug', con.config.db.debug);

      // Call callback FN
      if (cb) cb(db);
    }
  });
};

export function disconnect(cb?) {
  mongoose.disconnect(function (err) {
    console.log(chalk.bold.yellow('Disconnected from MongoDB.'));
    cb(err);
  });
};
