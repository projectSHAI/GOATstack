let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

import * as chalk from 'chalk';
import * as path from 'path';
import config from '../config';
let db;

// Initialize Mongoose
export function connect(cb?) {
  let db = mongoose.connect(config.db.uri, config.db.options, function (err) {
    // Log Error
    if (err) {
      console.error(chalk.bold.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {

      // Enabling mongoose debug mode if required
      mongoose.set('debug', config.db.debug);

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
