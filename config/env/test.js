'use strict';

module.exports = {
	port: process.env.PORT || 7001,
	db: {
		uri: 'mongodb://localhost/dreams-test',
	    // Enable mongoose debug mode
	    debug: process.env.MONGODB_DEBUG || false
	}
};