// importing modules the es6 way
import routes from './routes';
import config from '../config';

import * as mongoose from 'mongoose';
import * as path from 'path';
import * as passport from 'passport';

// Some modules still need to be imported via node
let express = require('express'),
  fs = require('graceful-fs'),
  chalk = require('chalk'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session);

// let webpack = require('webpack');
// let webpackConfig = require('../webpack.config')('dev');
// let compiler = webpack(webpackConfig);

// function to initialize the express app
function expressInit(app) {

  // if (process.env.NODE_ENV === 'development') {
  //   app.use(require('webpack-dev-middleware')(compiler, {
  //     noInfo: true,
  //     publicPath: webpackConfig.output.publicPath
  //   }));
  
  //   app.use(require('webpack-hot-middleware')(compiler));
  // }

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
      skip: function (req, res) { return res.statusCode < 400 }
    }));
  }
  
  // app.use(session({
  //   secret: config.sessionSecret,
  //   saveUninitialized: true,
  //   resave: false,
  //   store: new MongoStore({
  //     mongooseConnection: mongoose.connection,
  //     db: 'dreams'
  //   })
  // }));

  //sets the routes for all the API queries
  routes(app);

  const dist = fs.existsSync('dist');

  //exposes the client and node_modules folders to the client for file serving when client queries "/"
  app.use('/node_modules', express.static('node_modules'));
  app.use('/custom_modules', express.static('custom_modules'));
  app.use(express.static(`${ dist ? 'dist/client' : 'client' }`));
  app.use('/public', express.static('public'));

  //exposes the client and node_modules folders to the client for file serving when client queries anything, * is a wildcard
  app.use('*', express.static('node_modules'));
  app.use('*', express.static('custom_modules'));
  app.use('*', express.static(`${ dist ? 'dist/client' : 'client' }`));
  app.use('*', express.static('public'));

  // starts a get function when any directory is queried (* is a wildcard) by the client, 
  // sends back the index.html as a response. Angular then does the proper routing on client side
  if (process.env.NODE_ENV !== 'development')
    app.get('*', function(req, res) {
      res.sendFile(path.join(process.cwd(), `/${ dist ? 'dist/client' : 'client' }/index.html`));
    });

  return app;

};

export default expressInit;
