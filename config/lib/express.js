'use strict';

var express = require('express'),
	path = require("path"),
	app;

module.exports.init = function () {

	app = express();

	require('../../server/routes')(app);

	//exposes the client and node_modules folders to the client for file serving when client queries "/"
	app.use(express.static('client'));
	app.use(express.static('node_modules'));

	//exposes the client and node_modules folders to the client for file serving when client queries anything, * is a wildcard
	app.use('*', express.static('client'));
	app.use('*', express.static('node_modules'));

	return app;

};

module.exports.app = function() {
	
	return app;
	
};