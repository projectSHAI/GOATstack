'use strict';

var express = require('express'),
  path = require("path"),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  errorHandler = require('errorHandler'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  con = require('../config');

mongoose.Promise = require('bluebird');

module.exports.init = function (app) {

  //aditional app Initializations
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  // Initialize passport and passport session
  app.use(passport.initialize());

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
  require('../../dist/routes')(app);

  //exposes the client and node_modules folders to the client for file serving when client queries "/"
  app.use('/node_modules', express.static('node_modules'));
  app.use(express.static('config/sys'));
  app.use(express.static('dist/app'));

  //exposes the client and node_modules folders to the client for file serving when client queries anything, * is a wildcard
  app.use('*', express.static('node_modules'));
  app.use('*', express.static('config/sys'));
  app.use('*', express.static('dist'));

  // app.use(errorHandler());

  //fire's a get function when any directory is queried (* is a wildcard) by the client, sends back the index.html as a response. Angular then does the proper routing on client side
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });

  return app;

};
