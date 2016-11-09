import * as _ from 'lodash';
import Wonder from './wonder.model';

// if the wonder object was not found
function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// if there was an error of any kind return approapriate status code
function handleError(res, statusCode = null) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// When we update a wonder we are actually replacing an existing wonder
function updateWonder(res, wonder) {
  return function(entity) {
    if (entity) {
      // wonder = old wonder
      entity.name = wonder.name;
      entity.created = new Date().toISOString();
      // find new indeger for the x and y coors
      entity.xcoor = rndInt(5, 80);
      entity.ycoor = rndInt(10, 70);
      entity.save((err, wonder) => {
        // if there's an error than send a 400 code with error message
        if (err)
          res.status(400).json(err.errors.name);
        // send back 200 code with new wonder json
        res.json(wonder);
      });

    }
    return null;
  };
}

// IF the response needs the wonder abject as well
function respondWithResult(res, statusCode = null) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
      return null;
    }
  };
}

// save new wonder endpoint: not replace
function saveUpdates(updates) {
  return function(entity) {
    let updated = _.merge(entity, updates);
    return updated.save()
      .then(update => {
        return update;
      });
  };
}

// remove wonder endpoint
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
  return Wonder.findOne({}).sort({ created: 1 }).exec()
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
