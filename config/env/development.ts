/*
===============================================
Used when process.env.NODE_ENV = 'development'
===============================================
//This file adds config settings and overwrites config settings in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/

export const devEnv = {
  mongo: {
    uri: 'mongodb://localhost/dev',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  cassandra: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    queryOptions: { consistency: 1 },
    keyspace: 'dev'
  },
  sql: {
    // uri: 'postgres://postgres:postgres@localhost:5432/GOATstack'
    database: 'dev',
    username: 'postgres',
    password: 'postgres',
    options: {
      host: 'localhost',
      dialect: 'postgres'||'mysql'||'mariadb'||'sqlite'||'mssql',
    }
  },
  seedDB: true
};
