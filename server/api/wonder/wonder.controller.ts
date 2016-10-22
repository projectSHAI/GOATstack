import * as _ from 'lodash';
import Wonder from './wonder.model';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateWonder(res, wonder) {
  return function(entity) {
    if (entity) {
      entity.created = new Date().toISOString();
      entity.name = wonder.name;
      entity.xcoor = getRandomInt(10, 90);
      entity.ycoor = getRandomInt(10, 55);

      return entity.save(() => {
        res.json(entity);
      });
    }

  };
}

function respondWithResult(res, statusCode = null) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
      return null;
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    let updated = _.merge(entity, updates);
    return updated.save()
      .then(update => {
        return update;
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

function handleError(res, statusCode = null) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Wonders
export function index(req, res) {
  return Wonder.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Wonder from the DB
export function show(req, res) {
  return Wonder.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Wonder in the DB
export function create(req, res) {
  return Wonder.findOne({}).sort({
    created: 1
  }).exec()
    .then(updateWonder(res, req.body))
    .catch(handleError(res));
}

// Updates an existing Wonder in the DB
export function update(req, res) {
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
export function destroy(req, res) {
  return Wonder.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
