'use strict';

var MongoClient = require('mongodb').MongoClient,
	con = require('../config');


exports.damn = function () {
	MongoClient.connect(con.config.db.uri, con.config.options, function(err, db) {
	  if (err) {
	    throw err;
	  }
	  db.collection('dreams').find().toArray(function(err, result) {
	    if (err) {
	      throw err;
	    }
	    console.log(result);
	  });
	});
};
