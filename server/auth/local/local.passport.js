'use strict';

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

function localAuthenticate(User, email, password, done) {
  console.log('inside the passport.auth');
  User.findOne({
      email: email.toLowerCase()
    }).exec()
    .then(function (user) {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      user.authenticate(password, function (authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(function (err) {
      done(err)
    });
};

module.exports.setup = function (User, config) {
  console.log('inside the passport setup');
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function (email, password, done) {
    console.log('inside the passport setup callback');
    return localAuthenticate(User, email, password, done);
  }));
};
