import * as express from 'express'
import * as chalk from 'chalk';
import * as fs from 'graceful-fs';
import * as http from 'http';
import * as https from 'https';
import config from '../config';

import socketInit from './socketio';
import expressInit from './express';

import cassandraSeed from './cassandra-db/seed';
import mongoSeed from './mongo-db/seed';
import sqlSeed from './sql-db/seed';
import {connect, disconnect} from './db-connect';

const isSecure = config.https_secure && (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV);

// Initialize express
let app = express();

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

connect().subscribe(
  x => {},
  err => console.log(err),
  () => {
    expressInit(app);
    socketInit(socketio);
    
    if (config.seedDB) {
      mongoSeed(process.env.NODE_ENV);
      cassandraSeed(process.env.NODE_ENV);
      // sqlSeed(process.env.NODE_ENV);
    }

    // Start the server on port / host
    server.listen(config.port, config.host, () => {
      let host = server.address().address;
      let port = server.address().port;

      if (process.env.NODE_ENV !== 'test') {
            console.log(
              chalk.bold.cyan(`\n\tEnvironment:\t\t\t ${ process.env.NODE_ENV || 'production' }\n`));

            console.log(
              chalk.bold.cyan(`\tSQL:`) +
              chalk.bold.cyan(`\n\t - URI:\t\t\t\t sql://${config.sql.username}:${config.sql.password}@localhost:5432/${config.sql.database}\n`));

            if (!process.env.NODE_ENV)
              console.log(
                chalk.bold.magenta(`\t${isSecure ? 'HTTPS': 'HTTP'} Server`) +
                chalk.bold.gray(`\n\tServer Address:\t\t\t ${isSecure ? 'https': 'http'}://localhost:${ port }\n`));
            else
              console.log(
                chalk.bold.magenta(`\tWebPack DevServer:`) +
                chalk.bold.gray(`\n\tServer Address:\t\t\t ${isSecure ? 'https': 'http'}://localhost:1701\n`));
          }
    });    
  });

// export express app for testing
export default app;
