/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/user              ->  allUsers
 * POST    /api/user              ->  createUser
 * GET     /api/user/:id          ->  showUser
 * PUT     /api/user/:id          ->  updateUser
 * DELETE  /api/user/:id          ->  destroyUser
 */

'use strict';

var _ = require('lodash');
var User = require('./user.model');

module.exports.allUsers = function(req, res){
	res.json({ message: 'User returned!' });
}

module.exports.createUser = function(req, res){

	console.log(req.body.firstName);

	User.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password});

	res.send(req.body);
}

module.exports.showUser = function(req, res){
	return 'showUser';
}

module.exports.updateUser = function(req, res){
	return 'updateUser';
}

module.exports.destroyUser = function(req, res){
	return 'destroyUser';
}