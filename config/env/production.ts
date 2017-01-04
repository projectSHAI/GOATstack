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
    uri: process.env.DB_URI || 'mongodb://localhost/dreams-prod',
    options: {
      user: process.env.DB_USER || '',
      pass: process.env.DB_PW || ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  seedDB: true
};
