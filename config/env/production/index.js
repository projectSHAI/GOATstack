////////////////////////////////////////////////////////////////////////
/* SystemJS server-side configuration file
    This requires the server-side modules file (systemjs.server.js)
    Systemjs does not support node file extension manager 
    (client side is different bc angular2) so it's then required to
    import the node modules that used the node file extention format
    using a System.set() command and create an object with the 
    approapriate functions

    NOTE: systemjs in this case is used to bundle the server-side
          this will only be used in production mode
*/
////////////////////////////////////////////////////////////////////////
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
