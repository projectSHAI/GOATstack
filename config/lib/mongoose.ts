import {config} from '../config';
let con = config();

import mongoose from 'mongoose';

let chalk = require('chalk'),
  	path = require('path'),
    db;

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
      console.error(chalk.red('Could not connect to MongoDB!'));
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
    console.log(chalk.yellow('Disconnected from MongoDB.'));
    cb(err);
  });
};
