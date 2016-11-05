"use strict";

var System = require('systemjs');
require('./server.js');
require('./systemjs.server.js');

System.config({
  paths: {
    'npm:': 'node_modules/'
  },
  map: {
    app: 'server/server',
    lodash: 'npm:lodash/lodash.js'
  },
  packages: {
    lodash: { defaultExtension: 'js' }
  }
});

System.import('app').catch(function (err) {
  console.error(err);
});
