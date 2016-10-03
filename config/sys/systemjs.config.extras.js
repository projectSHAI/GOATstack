/* jshint ignore:start */

/** App specific SystemJS configuration */
System.config({
  packages: {
    // barrels
    'app/model': {main:'server/server.js', defaultExtension:'js'},
    'app/model/testing': {main:'server/server.js', defaultExtension:'js'}
  }
});

/* jshint ignore:end */
