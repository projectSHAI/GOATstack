'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Collection = require('../collection/collection.controller');
var DropBox = require('../dropbox/dropbox.controller');

var path = 'uploads/Users/';

// function createUserFolder(res) {
//   return function(user) {
//     if (user) {
//       DropBox.mkdir({}, res, path, user._id);
//       return user;
//     }
//   };
// }

function showCollections(req, res) {
  return function (user) {
    if (user) {
      return Collection.getCollectionsData(req, res, user, function (entity) {
        res.json(entity);
      });
    }
  }
}

function pushCollectionId(req, res, collection) {
  return function (entity) {
    if (entity) {
      entity.collections.push({
        _id: collection._id
      });
      return entity.save()
        .then(() => {
          if (req.body.testing) {
            res.status(201).json({
              user: entity,
              collection: collection
            });
          } else {
            res.status(201).json(collection);
          }
        });
    }
  }
}

function pullCollectionId(res, collection) {
  return function (entity) {
    if (entity) {
      entity.collections.pull({
        _id: collection._id
      });
      entity.save();
      res.json(entity);
    }
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
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
      }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({
        token
      });
    })
    .catch(validationError(res));
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
 * Change a users password
 */
module.exports.changePassword = function (req, res, next) {
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
 * Get my info
 */
module.exports.me = function (req, res, next) {
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

/**
 * Authentication callback
 */
module.exports.authCallback = function (req, res, next) {
  res.redirect('/');
}

/*
 *  Get allcollections and their image information
 */
module.exports.getCollections = function (req, res) {
  // return User.findById(req.user._id).exec()
  //   .then(showCollections(req, res))
  //   .catch(validationError(res));

  return Collection.getCollectionsData(req, res, function (final) {
    res.json(final);
  });
}

/*
 * Add collection to user
 */
module.exports.addCollection = function (req, res) {
  var userId = req.user._id;

  return Collection.create(req, res, function (collection) {
    return User.findById(userId).exec()
      .then(pushCollectionId(req, res, collection))
      .catch(validationError(res));
  });
}

/*
 * Remove collection
 */
module.exports.removeCollection = function (req, res) {
  return Collection.destroy(req, res, function (collection) {
    return User.findById(collection.userId).exec()
      .then(pullCollectionId(res, collection))
      .catch(validationError(res));
  });
}

/*
 * Upload image to user collection
 */
module.exports.addImage = function (req, res) {
  return Collection.addImage(req, res);
}

/*
 * Remove image from user collection
 */
module.exports.removeImage = function (req, res) {
  return Collection.removeImage(req, res);
}
