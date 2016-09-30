'use strict';

var _ = require('lodash');
var Wonder = require('./wonder.model');

var Coords = [
  {x: 10, y: 10}, {x: 15, y: 20}, {x: 20, y: 15}, {x: 25, y: 20}, {x: 20, y: 25}, {x: 30, y: 25}, {x: 25, y: 30},
  {x: 30, y: 35}, {x: 35, y: 30}, {x: 40, y: 35}, {x: 35, y: 40}, {x: 45, y: 40}, {x: 50, y: 45}, {x: 45, y: 50},
  {x: 55, y: 50}, {x: 50, y: 55}, {x: 60, y: 55}, {x: 55, y: 60}, {x: 65, y: 60}, {x: 60, y: 65}, {x: 70, y: 65},
  {x: 65, y: 70}, {x: 75, y: 70}, {x: 70, y: 75}, {x: 80, y: 75}
];

var switchX, switchY, counter = 0;

function updateWonder(res, wonder) {
  return function(entity) {
    if (entity) {
      switchX = entity.xcoor;
      switchY = entity.ycoor;
      entity.name = wonder.name;
      entity.created = new Date().toISOString();
      entity.xcoor = Coords[counter].x;
      entity.ycoor = Coords[counter].y;
      Coords[counter] = {
        x: switchX,
        y: switchY
      };
      entity.save();
      res.json(entity);

      counter++;
      if(counter > 19){
        counter = 0;
      }
    }
    return null;
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
      return;
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Wonders
module.exports.index = function (req, res) {
  return Wonder.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Wonder from the DB
module.exports.show = function (req, res) {
  return Wonder.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Wonder in the DB
module.exports.create = function (req, res) {
  return Wonder.findOne({}).sort({
      created: 1
    }).exec()
    .then(updateWonder(res, req.body))
    .catch(handleError(res));
}

// Updates an existing Wonder in the DB
module.exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Wonder.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Wonder from the DB
module.exports.destroy = function (req, res) {
  return Wonder.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
