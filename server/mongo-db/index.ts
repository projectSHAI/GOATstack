let mongoose = require('mongoose');
mongoose.Promise = Promise;

import * as chalk from 'chalk';
import config from '../../config';
import seed from './seed';

// Initialize Mongoose
export function mongoConnect() {
  mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
    // Log Error
    if (err) {
      console.error(chalk.bold.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {
      if (config.seedDB) {
        seed(process.env.NODE_ENV);
      }
      // Enabling mongoose debug mode if required
      mongoose.set('debug', config.mongo.debug);
    }
  });
};

export function mongoDisconnect() {
  mongoose.disconnect(function (err) {
    console.log(chalk.bold.yellow('Disconnected from MongoDB.'));
  });
};