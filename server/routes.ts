/**
 * Main application routes
 */

'use strict';

let path = require('path');

export = function(app) {
  // Insert routes below

  app.use('/api/wonders', require('./api/wonder/wonder.router'));
  app.use('/api/users', require('./api/user/user.router'));
  app.use('/auth', require('./auth/auth.router'));

};
