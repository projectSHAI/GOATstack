"use strict";

var express = require('../config/lib/express');
var mongoose = require('../config/lib/mongoose');
var con = require('../config/config');
var path = require('path');	
var chalk = require('chalk');

// Initialize models
mongoose.loadModels();

var init = function init(callback) {
  mongoose.connect(function (db) {
  	
    // Initialize express
    var app = express.init();
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