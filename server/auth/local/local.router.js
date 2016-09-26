'use strict';

var express = require('express');
var passport = require('passport');
var signToken = require('../auth.service').signToken;

var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body);
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      console.log('error 1');
      return res.status(401).json(error);
    }
    if (!user) {
      console.log('error 2');
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);
    res.json({ token });
  })(req, res, next)
});

module.exports = router;
