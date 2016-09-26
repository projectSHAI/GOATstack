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
  app.use('/api/wonders', require('./api/wonder/wonder.router'));
  app.use('/api/users', require('./api/user/user.router'));
  // app.use('/api/things', require('./api/thing'));
  // app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth/auth.router'));

}
