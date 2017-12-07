// importing modules the es6 way
import config from '../config';

import * as path from 'path';
import * as express from 'express';
import * as fs from 'graceful-fs';
import * as chalk from 'chalk';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
  // Express Engine
  import { ngExpressEngine } from '@nguniversal/express-engine';
  // Import module map for lazy loading
  import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// function to initialize the express app
function expressInit(app) {

  // * NOTE :: leave this as require() since this file is built Dynamically from webpack
  const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('dist/server/index.js');

  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }));

  //aditional app Initializations
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  //initialize morgan express logger
  // NOTE: all node and custom module requests
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev', {
      skip: function (req, res) { return res.statusCode < 400 }
    }));
  }

  const dist = fs.existsSync('dist');

  //exposes the client and node_modules folders to the client for file serving when client queries "/"
  app.use('/node_modules', express.static('node_modules'));
  app.use(express.static(`${dist ? 'dist/client' : 'client'}`));
  app.use('/public', express.static('public'));

  //exposes the client and node_modules folders to the client for file serving when client queries anything, * is a wildcard
  app.use('*', express.static('node_modules'));
  app.use('*', express.static(`${dist ? 'dist/client' : 'client'}`));
  app.use('*', express.static('public'));

  // starts a get function when any directory is queried (* is a wildcard) by the client, 
  // sends back the index.html as a response. Angular then does the proper routing on client side
  if (process.env.NODE_ENV !== 'development')
    app.get('*', function (req, res) {
      res.sendFile(path.join(process.cwd(), `/${dist ? 'dist/client' : 'client'}/index.html`));
    });

  return app;

};

export default expressInit;
