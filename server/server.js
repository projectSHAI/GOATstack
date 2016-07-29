"use strict";

var express = require("express"),
	path = require("path"),
	mongoose = require('../config/lib/mongoose'),
	con = require('../config/config'),
  	chalk = require('chalk');

// Initialize models
mongoose.loadModels();

var init = function init(callback) {
  mongoose.connect(function (db) {

	console.log('in init');

    // Initialize express
    var app = express();
    app.use(express.static('client'));
	app.use(express.static('node_modules'));
	app.get('/', function (req, res) {
	    res.sendFile(path.resolve(__dirname, 'index.html'));
	});

    if (callback) callback(app, db, con);

  });
};

init(function (app, db, con) {

	var server = app.listen(con.config.port, con.config.host, function () {
	    var host = server.address().address;
	    var port = server.address().port;

	    // Logging initialization
	    console.log('\t--');
	    console.log(chalk.green('\tProject Name:\t\t\t' + con.config.app.title));
	    console.log(chalk.green('\tEnvironment:\t\t\t' + process.env.NODE_ENV));
	    console.log(chalk.green('\tPort:\t\t\t\t' + port));
	    console.log(chalk.green('\tHost:\t\t\t\t' + host));
	    console.log(chalk.green('\tDatabase:\t\t\t' + con.config.db.uri));

	});

});