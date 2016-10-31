/*
===============================================
Used when process.env.NODE_ENV = 'production'
===============================================
//This file adds config settings and overwrites config settings in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/

export const prodEnv = {
  port: process.env.PORT || 8443,
  // Binding to 127.0.0.1 is safer in production.
  host: process.env.HOST || '0.0.0.0',
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/dreams-prod',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  livereload: false,
  seedDB: true,
  seedFile: '../config/lib/seed.prod'
};
