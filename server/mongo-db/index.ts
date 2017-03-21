let mongoose = require('mongoose');
mongoose.Promise = Promise; // promise library plugin

import * as chalk from 'chalk';
import config from '../../config';

import * as Rx from 'rxjs';

// Initialize Mongoose
export function mongoConnect(): Rx.Observable<any> {
  return Rx.Observable.create(observer => {

    mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
      // Log Error
      if (err) {
        console.error(chalk.bold.red('Could not connect to MongoDB!'));
        observer.error(err);
      } else {
        // Enabling mongoose debug mode if required
        mongoose.set('debug', config.mongo.debug);
        
        observer.next();
        observer.complete();
      }
    });
    
  });
};

export function mongoDisconnect() {
  mongoose.disconnect(function (err) {
    console.log(chalk.bold.yellow('Disconnected from MongoDB.'));
  });
};