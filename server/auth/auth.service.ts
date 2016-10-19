import User from '../api/user/user.model';

import {config} from '../../config/config';
let con = config();

let passport = require('passport');
let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let compose = require('composable-middleware');

let validateJwt = expressJwt({
  secret: con.config.sessionSecret
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      return validateJwt(req, res, next);
    })
    // Attach user to request
    .use((req, res, next) => {
      return User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
          // runnaway promise to remove node warning
          return null;
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (con.config.userRoles.indexOf(req.user.role) >=
        con.config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({
    _id: id,
    role: role
  }, con.config.sessionSecret, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  let token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}
