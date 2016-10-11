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
    return null;
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
    return null;
  };
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

/**
 * Get list of users
 * restriction: 'admin'
 */
module.exports.index = function (req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
module.exports.create = function (req, res, next) {
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

      req.headers.token = token;
      req.user = user;
      next();
      // res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
module.exports.destroy = function (req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function () {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Get a single user
 */
module.exports.show = function (req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Get my info
 */
module.exports.me = function(req, res, next) {
  var userId = req.user._id;
  var token = req.headers.token;

  return User.findOne({
      _id: userId
    }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }

      if (token) res.json({ token, user });
      else res.json(user);

      return null;
    })
    .catch(err => next(err));
}
