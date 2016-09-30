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
var con = require('../../../config/config');
var jwt = require('jsonwebtoken');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  }
}

/**
 * Change a users password
 */
module.exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

module.exports.allUsers = function(req, res){
		//User is a mongoose schema model
		//.find is a mongoose method that accepts a json to search mongodb as the first argument, and a callback function that can take err and res as arguments
		User.find({})
			//.then is a promise method that fires after the previous method and fires whatever function you place inside
			//entity is the argument which catches the json object that is passed back from the mongodb query invoked by the .find method
			.then(function(entity) {
				//if we have the mongodb entity then we will send back the status 200 message and the json object
				if(entity)
				res.status(200).json(entity)
			})
			//.catch will occur if one of the promises fails to do error handling
			.catch(function(){
				res.status(500).send({error: "Server did not get an entity response object from the database"})
			});

}

/**
 * Creates a new user
 */
module.exports.createUser = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  return newUser.save()
    .then(function (user) {
      var token = jwt.sign({
        _id: user._id
      }, con.config.sessionSecret, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get my info
 */
module.exports.me = function(req, res, next) {
  console.log('inside me');
  var userId = req.user._id;

  return User.findOne({
      _id: userId
    }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
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
