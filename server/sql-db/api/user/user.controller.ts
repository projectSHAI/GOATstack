import User from './user.model';
import config from '../../../../config';

import * as jwt from 'jsonwebtoken';

// Handles status codes and error message json
// specificity: validation
function validationError(res, err, statusCode = null) {

    console.log('error object',err.errors[0]);
  statusCode = statusCode || 422;

    res.status(statusCode).json(err.errors[0]);
    return null;

}

// Handles status codes and error message json
// specificity: error
function handleError(res, err, statusCode = null) {
  statusCode = statusCode || 500;

    res.status(statusCode).send(err.errors[0]);
    return null;

}

/**
 * Change a users password endpoint
 */
export function changePassword(req, res, next) {
  let userId = req.user.id;
  let oldPass = String(req.body.oldPassword);
  let newPass = String(req.body.newPassword);

  return User.findById(userId).then(user => {
      if (user['authenticate'](oldPass)) {
        user['password'] = newPass;
        return user['save']()
          .then(() => {
            res.status(204).end();
          })
          .catch(err => validationError(res, err));
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
  return User.findAll({ attributes: {exclude: ['salt', 'password'] } }).then(users => {
      res.status(200).json(users);
    })
    .catch(err => handleError(res, err));
}

/**
 * Creates a new user endpoint
 */
export function create(req, res, next) {
  
  User.create({ 
    username: req.body.username, 
    email: req.body.email, 
    password: req.body.password,
    role: 'user'
  }).then(user => {
      let token = jwt.sign(
        { id: user['id'] },
        config.sessionSecret,
        { expiresIn: 60 * 60 * 5 }
      );

      req.headers.token = token;
      req.user = user;
      next();

      return null;
    })
    .catch(err => {
        console.log('in create', err);
      validationError(res, err);
    });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.destroy({where: {id: req.params.id}})
    .then(function() {
      res.status(204).end();
    })
    .catch(err => handleError(res, err));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  let userId = req.params.id;

  return User.findById(userId).then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user['profile']);
    })
    .catch(err => validationError(res, err));
}

/**
 * Get my info: all user information
 */
export function me(req, res, next) {
    console.log('in me');
  let userId = req.user.id;
  let token = req.headers.token;

  return User.findOne({ where: {id: userId}, attributes: {exclude: ['salt', 'password'] } }).then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
      }

      if (token) res.json({ token, user });
      else res.json(user);

      return null;
    })
    .catch(err => validationError(res, err));
}
