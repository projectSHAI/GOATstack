/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {
  // Insert routes below

  app.use('/api/wonders', require('./api/wonder/wonder.router'));
  app.use('/api/users', require('./api/user/user.router'));
  app.use('/auth', require('./auth/auth.router'));

}
