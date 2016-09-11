/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {
  // Insert routes below
  // app.use('/api/images', require('./api/image'));
  // app.use('/api/dropbox', require('./api/dropbox'));
  // app.use('/api/collections', require('./api/collection'));
  app.use('/api/wonders', require('./api/wonder/wonder.router.js'));
  // app.use('/api/things', require('./api/thing'));
  // app.use('/api/users', require('./api/user'));

  // app.use('/auth', require('./auth').default);

  //fire's a get function when any directory is queried (* is a wildcard) by the client, sends back the index.html as a response. Angular then does the proper routing on client side
  app.get('*', function (req, res) {
      res.sendFile(path.resolve(__dirname, 'index.html'));
  });

}