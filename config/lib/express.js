'use strict';

var express = require('express'),
	path = require("path");

module.exports.init = function () {
	var app = express();

	app.use(express.static('client'));
	app.use(express.static('node_modules'));
	app.get('/', function (req, res) {
	    res.sendFile(path.resolve(__dirname, 'index.html'));
	});

	return app;
};