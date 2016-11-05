
import {routes} from '../../server/routes';
import {config} from '../config';
let con = config();

import * as mongoose from 'mongoose';
import * as path from 'path';
import * as passport from 'passport';

let express = require('express'),
  chalk = require('chalk'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  errorHandler = require('errorHandler'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session);

morgan.token('method', function(req, res) {
  let method = req.method;
  switch (method) {
    case 'GET':
      return '[' + chalk.cyan(method) + ']';
    default:
      return '[' + chalk.bold.green(method) + ']';
  }
});

morgan.token('url', function(req, res) {
  return chalk.magenta(req.originalUrl);
});

function init(app) {

  //aditional app Initializations
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  // Initialize passport and passport session
  app.use(passport.initialize());

  //initialize morgan express logger
  // NOTE: all node and custom module requests
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev', {
      skip: function(req, res) {
        let url = req.originalUrl;

        if (url.indexOf('node') !== -1)
          return true;
        if (url.indexOf('custom') !== -1)
          return true;
        if (url.length === 1)
          return true;
      }
    }));
  }

  app.use(session({
    secret: con.config.sessionSecret,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'dreams'
    })
  }));

  //sets the routes for all the API queries
  routes(app);

  //exposes the client and node_modules folders to the client for file serving when client queries "/"
  app.use('/node_modules', express.static('node_modules'));
  app.use('/custom_modules', express.static('custom_modules'));
  app.use(express.static('dist/app'));

  //exposes the client and node_modules folders to the client for file serving when client queries anything, * is a wildcard
  app.use('*', express.static('node_modules'));
  app.use('*', express.static('custom_modules'));
  app.use('*', express.static('dist/app'));

  app.use(errorHandler());

  //fire's a get function when any directory is queried (* is a wildcard) by the client, sends back the index.html as a response. Angular then does the proper routing on client side
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../../dist/client/app/index.html'));
  });

  return app;

};

export {init as expressInit};
