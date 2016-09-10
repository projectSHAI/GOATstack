'use strict';

var express = require('express'),
	path = require("path");

module.exports.init = function () {
	var app = express();

	//exposes the client and node_modules folders to the client for file serving when client queries "/"
	app.use(express.static('client'));
	app.use(express.static('node_modules'));

	//exposes the client and node_modules folders to the client for file serving when client queries anything, * is a wildcard
	app.use('*', express.static('client'));
	app.use('*', express.static('node_modules'));

	//fire's a get function when any directory is queried (* is a wildcard) by the client, sends back the index.html as a response. Angular then does the proper routing on client side
	app.get('*', function (req, res) {
	    res.sendFile(path.resolve(__dirname, 'index.html'));
	});

	return app;
};
