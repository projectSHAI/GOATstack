'use strict'

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

	created: {
    	type: Date,
    	default: Date.now
  	},
  	firstName: {
  		type: String,
  		required: 'a user needs a first name'
  	},
  	lastName: {
  		type: String
  	},
  	email: {
  		type: String
  	},
  	password: {
  		type: String,
  		required: 'a user needs a password'
  	}

});

module.exports = mongoose.model('User', UserSchema)