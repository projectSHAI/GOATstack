/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/collections              ->  index
 * POST    /api/collections              ->  create
 * GET     /api/collections/:id          ->  show
 * PUT     /api/collections/:id          ->  update
 * DELETE  /api/collections/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Collection = require('./collection.model');
var Image = require('../image/image.controller');
var DropBox = require('../dropbox/dropbox.controller');

function collectImageData(req, res, cb) {
  return function (collections) {
    if (collections) {
      return Image.gather(req, res, collections, function (final) {
        return cb ? cb(final) : final;
      });
    }
  };
}

function pushNewImageId(req, res, image, dropbox) {
  return function (entity) {
    if (entity) {
      entity.gallery.push({
        _id: image._id
      });
      entity.save()
        .then(() => {
          if (req.body.testing) {
            res.status(201).json({
              collection: entity,
              image: image,
              dropbox: dropbox
            });
          } else {
            res.status(201).json(image);
          }
        });
    }
  };
}

function pullImageId(req, res) {

  return function (entity) {
    if (entity) {
      return Image.destroy(req, res, entity, function (image) {
        if (req.params.testing) {
          return DropBox.del(req, res, image.path, function (file) {
            if (image._id) {
              entity.gallery.pull({
                _id: image._id
              });

              if (!entity.gallery.length) {
                DropBox.del(null, res, entity.path + entity._id);
              }

              return entity.save()
                .then(() => {
                  if (req.params.testing) {
                    res.json({
                      dropbox: file,
                      image: image,
                      collection: entity
                    });
                  } else {
                    res.json(entity);
                  }
                });
            }
          });
        } else {
          DropBox.del(req, res, image.path);
          if (image._id) {
            entity.gallery.pull({
              _id: image._id
            });

            if (!entity.gallery.length) {
              DropBox.del(null, res, entity.path + entity._id);
            }

            return entity.save()
              .then(() => {
                if (req.params.testing) {
                  res.json({
                    // dropbox: file,
                    image: image,
                    collection: entity
                  });
                } else {
                  res.json(entity);
                }
              });
          }
        }
      });
    }
  };
}

function respondWithCallbackForDeletion(req, res, cb) {
  return function (entity) {
    if (entity) {
      Image.destroyAll(req, res, entity, function () {
        DropBox.del(req, res, entity.path + entity._id, function (folderInfo) {
          return entity.remove()
            .then(() => {
              return cb ? cb(entity, folderInfo) : entity;
            });
        });
      });
    }
  };
}

function respondWithCallback(res, cb) {
  return function (entity) {
    if (entity) {
      return cb(entity);
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

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Collections
module.exports.index = function (req, res) {
  return Collection.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

module.exports.getCollectionsData = function (req, res, cb) {
  return Collection.find()
    .where('_id')
    .in(req.user.collections)
    .sort({
      '_id': 1
    })
    .exec()
    .then(collectImageData(req, res, cb))
    .catch(handleError(res));
}

// Gets a single Collection from the DB
module.exports.show = function (req, res) {
  return Collection.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Collection in the DB
module.exports.create = function (req, res, cb) {
  // TODO: use req.user information instead of passing info from client!!
  return Collection.create(req.body)
    .then(respondWithCallback(res, cb))
    .catch(handleError(res));
}

// Updates an existing Collection in the DB
module.exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Collection.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Collection from the DB
module.exports.destroy = function (req, res, cb) {
  return Collection.findById(req.params._id).exec()
    .then(respondWithCallbackForDeletion(req, res, cb))
    .catch(handleError(res));
}

// Updates an existing Collection Gallery in the DB
module.exports.addImage = function (req, res) {

  return DropBox.upload(req, res, function (file) {
    return Image.create(req, res, function (image) {
      if (image._id) {
        // Find Collection by id and then push new image ID to colleciton gallery
        return Collection.findById(req.body.imageInfo.collectionId).exec()
          .then(pushNewImageId(req, res, image, file))
          .catch(handleError(res));
      }
    });
  });

}

module.exports.removeImage = function (req, res) {
  return Collection.findById(req.params.collection_id).exec()
    .then(pullImageId(req, res))
    .catch(handleError(res));
}
