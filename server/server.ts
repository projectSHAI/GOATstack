let express = require('express');

import * as chalk from 'chalk';
import * as fs from 'graceful-fs';
import * as http from 'http';
import * as https from 'https';
import config from '../config';

import socketInit from './socketio';
import expressInit from './express';
import {connect, disconnect} from './mongoose';

import seed from './seed';

const isSecure = config.https_secure && (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV);

// Initialize express
let app = express();

//seed db
if (config.seedDB) {
  process.env.NODE_ENV === 'production' ? seed('prod') : seed();
}

function init(): any {

  connect(function(db) {
    // Initialize http server
    let server: any = http.createServer(app);

    // If specified in the default assets, https will be used
    if (isSecure) {
      let credentials = {
        key: fs.readFileSync(config.key_loc, 'utf8'),
        cert: fs.readFileSync(config.cert_loc, 'utf8')
      };

      server = https.createServer(credentials, app);
    }

    // Initialize the socketio with the respective server
    let socketio = require('socket.io')(server, {
      // serveClient: process.env.NODE_ENV !== 'production',
      path: '/socket.io-client'
    });

    // Start configure the socketio
    socketInit(socketio);
    // Initialize express features
    expressInit(app);


    // Start the server on port / host
    server.listen(config.port, config.host, () => {
      let host = server.address().address;
      let port = server.address().port;

      if (process.env.NODE_ENV !== 'test') {
        // Logging initialization\
        console.log(chalk.bold.cyan(`\n\tEnvironment:\t\t\t ${ process.env.NODE_ENV || 'production' }`));
        console.log(chalk.bold.cyan(`\tDatabase:\t\t\t ${ config.db.uri }`));

        console.log(chalk.bold.magenta(`\n\t${isSecure ? 'HTTPS': 'HTTP'} Server`));
        console.log(chalk.bold.gray(`\tServer Address:\t\t\t ${isSecure ? 'https': 'http'}://localhost:${ port }`));

      }
    });

    return app;

  });
};

init();

// export express app for testing
export default app;
