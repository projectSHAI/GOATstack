/*
======================================================================================
Used when process.env.NODE_ENV is equal to 'test'
======================================================================================
//This file adds config settings and overwrites config settings in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/

export const testEnv = {
	port: process.env.PORT || 7001,
	mongo: {
		uri: 'mongodb://localhost/test',
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
	  keyspace: 'test'
	},
	sql: {
	  // uri: 'postgres://postgres:postgres@localhost:5432/GOATstack'
	  database: 'test',
	  username: 'postgres',
	  password: 'postgres',
	  options: {
	    host: 'localhost',
	    dialect: 'postgres'||'mysql'||'mariadb'||'sqlite'||'mssql',
	  }
	},
	seedDB: true
};
