/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/images              ->  index
 * POST    /api/images              ->  create
 * GET     /api/images/:id          ->  show
 * PUT     /api/images/:id          ->  update
 * DELETE  /api/images/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Image = require('./image.model');

function combineCollectionsAndImages(res, collections, cb) {
  return function (images) {
    if (images) {
      var count = 0;

      for (var i = 0; i < collections.length; i++) {
        for (var o = 0; o < collections[i].gallery.length; o++) {
          // Sorting the images based off collectionIds
          // Should be in 1 to 1 corrolation to collections gallery
          // TODO: could be problem child in the future
          if (collections[i].gallery[o]._id) {
            collections[i].gallery[o] = images[count++];
          }
        }
      }
      return cb ? cb(collections) : collections;
    }
  }
}

function combineImageIds(collections) {
  var imageIds = [];

  for (var i = 0; i < collections.length; i++) {
    for (var o = 0; o < collections[i].gallery.length; o++) {
      if (collections[i].gallery[o]._id) {
        imageIds.push(collections[i].gallery[o]._id);
      }
    }
  }
  return imageIds;
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

function removeEntityWithCallback(req, res, cb) {
  return function (entity) {
    if (entity) {
      var oldImage;
      for (var i = 0; i < entity.length; i++) {
        if (entity[i]._id.equals(req.params._id) && !oldImage) {
          oldImage = entity[i];
          entity[i].remove();
        } else if (oldImage) {
          entity[i].pic_order--;
          entity[i].save();
        }
      }

      if (!oldImage) {
        res.status(404).end();
        return null;
      }

      return cb ? cb(oldImage) : oldImage;
    }
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

// Gets a list of Images
module.exports.index = function (req, res) {
  return Image.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get all images in collections
module.exports.gather = function (req, res, collections, cb) {

  var imageIds = combineImageIds(collections);

  return Image.find()
    .where('_id')
    .in(imageIds)
    .sort({
      'collectionId': 1
    })
    .exec()
    .then(combineCollectionsAndImages(res, collections, cb))
    .catch(handleError(res));

}

// Gets a single Image from the DB
module.exports.show = function (req, res) {
  return Image.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Image in the DB
module.exports.create = function (req, res, cb) {
  return Image.create(req.body.imageInfo)
    .then(respondWithCallback(res, cb))
    .catch(handleError(res));
}

// Updates an existing Image in the DB
module.exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Image.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Image from the DB
module.exports.destroy = function (req, res, collection, cb) {
  return Image.find()
    .where('_id')
    .in(collection.gallery)
    .sort({
      'pic_order': 1
    })
    .exec()
    .then(handleEntityNotFound(res))
    .then(removeEntityWithCallback(req, res, cb))
    .catch(handleError(res));
}

// Deletes all images with collectionid
module.exports.destroyAll = function (req, res, collection, cb) {
  return Image.find()
    .where('_id')
    .in(collection.gallery)
    .remove()
    .then(function (res) {
      return cb ? cb() : null;
    })
    .catch(handleError(res));
}
