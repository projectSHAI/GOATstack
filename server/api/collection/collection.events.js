/**
 * Collection model events
 */

'use strict';

var EventEmitter = require('event').EventEmitter;
var Collection = require('./collection.model');
var CollectionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CollectionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Collection.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CollectionEvents.emit(event + ':' + doc._id, doc);
    CollectionEvents.emit(event, doc);
  }
}

module.exports = CollectionEvents;
