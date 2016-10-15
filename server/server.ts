"use strict";
let fs = require('fs');
let express = require('express');
let mongoose = require('../config/lib/mongoose');
let con = require('../config/config');
let http = require('http');
let https = require('https');
let path = require('path');
let chalk = require('chalk');

// Initialize express
let app = express();
// Set address for jasmine supertest
// There was problems with just 'app'
app.set('address', 'http://localhost:' + con.config.port);

//seed db
if (con.config.seedDB) { require(con.config.seedFile); }

// Initialize models
mongoose.loadModels();

let init = function init(callback) {
  mongoose.connect(function (db) {
    // Initialize http server
    let server = http.createServer(app);

    // If specified in the default assets, https will be used
    if (con.config.https_secure) {
      let credentials = {
        key: fs.readFileSync(con.config.key_loc, 'utf8'),
        cert: fs.readFileSync(con.config.cert_loc, 'utf8')
      };

      server = https.createServer(credentials, app);
    }

    // Initialize the socketio with the respective server
    let socketio = require('socket.io')(server, {
      // serveClient: process.env.NODE_ENV !== 'production',
      path: '/socket.io'
    });

    // Start configure the socketio
    require('../config/lib/socketio')(socketio);
    // Initialize express features
    require('../config/lib/express').init(app);

    return callback ? callback(app, db, con, server) : app;

  });
};

init(function (app, db, con, server) {

  server.listen(con.config.port, con.config.host, function () {
    let host = server.address().address;
    let port = server.address().port;

    if (process.env.NODE_ENV !== 'test') {
      // Logging initialization
      console.log('');
      console.log(chalk.bold.cyan('\tProject Name:\t\t\t' + con.config.app.title));
      console.log(chalk.bold.cyan('\tEnvironment:\t\t\t' + process.env.NODE_ENV));
      console.log(chalk.bold.cyan('\tDatabase:\t\t\t' + con.config.db.uri));
      console.log('');

      if (!con.config.https_secure) {
        console.log(chalk.bold.magenta('\tHTTP Server'));
        console.log(chalk.bold.gray('\tAddress:\t\t\t' + 'http://localhost:' + port));
      } else {
        console.log(chalk.bold.magenta('\tHTTPS Server'));
        console.log(chalk.bold.gray('\tAddress:\t\t\t' + 'https://localhost:' + port));
      }

      console.log(chalk.bold.gray('\tPort:\t\t\t\t' + port));
      console.log(chalk.bold.gray('\tHost:\t\t\t\t' + host));
      console.log('');
    }
  });
});

// export app for testing
export = app;
