import * as _ from 'lodash';
import Wonder from './wonder.model';

let Coords = [
  {x: 10, y: 20}, {x: 40, y: 20}, {x: 80, y: 15}, {x: 25, y: 20}, {x: 18, y: 25}, {x: 60, y: 40}, {x: 25, y: 30},
  {x: 30, y: 35}, {x: 35, y: 30}, {x: 40, y: 35}, {x: 35, y: 40}, {x: 45, y: 40}, {x: 50, y: 45}, {x: 45, y: 50},
  {x: 55, y: 50}, {x: 50, y: 55}, {x: 60, y: 55}, {x: 55, y: 60}, {x: 65, y: 60}, {x: 60, y: 65}, {x: 70, y: 65},
  {x: 65, y: 70}, {x: 75, y: 70}, {x: 70, y: 75}, {x: 80, y: 75}
];

let switchX, switchY, counter = 0;

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
      if(counter > 9){
        counter = 0;
      }
    }
    return null;
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
