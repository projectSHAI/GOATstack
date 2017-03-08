import User from './user.model';
import config from '../../../../config';

import * as jwt from 'jsonwebtoken';

// Handles status codes and error message json
// specificity: validation
function validationError(res, statusCode = null) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
    return null;
  };
}

// Handles status codes and error message json
// specificity: error
function handleError(res, statusCode = null) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
    return null;
  };
}

/**
 * Change a users password endpoint
 */
export function changePassword(req, res, next) {
  let userId = req.user._id;
  let oldPass = String(req.body.oldPassword);
  let newPass = String(req.body.newPassword);

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
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user endpoint
 */
export function create(req, res, next) {
  let newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  return newUser.save()
    .then(user => {
      let token = jwt.sign(
        { _id: user._id },
        config.sessionSecret,
        { expiresIn: 60 * 60 * 5 }
      );

      req.headers.token = token;
      req.user = user;
      next();

      return null;
    })
    .catch(validationError(res));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  let userId = req.params.id;

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
 * Get my info: all user information
 */
export function me(req, res, next) {
  let userId = req.user._id;
  let token = req.headers.token;

  return User.findOne({
    _id: userId
  }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
      }

      if (token) res.json({ token, user });
      else res.json(user);

      return null;
    })
    .catch(err => next(err));
}
