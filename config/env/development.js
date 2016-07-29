'use strict';

module.exports = {
  db: {
    uri: 'mongodb://localhost/dreams-dev',
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  livereload: true
};