'use strict';

var passport = require('passport');
var con = require('../../config/config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
// var compose = require('composable-middlware');
var User = require('../api/user/user.model');

/**
 * Returns a jwt token signed by the app secret
 */
module.exports.signToken = function(id, role) {
  return jwt.sign({ _id: id, role: role }, con.config.sessionSecret, {
    expiresIn: 60 * 60 * 5
  });
};

/**
 * Set token cookie directly for oAuth strategies
 */
module.exports.setTokenCookie = function(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
};
