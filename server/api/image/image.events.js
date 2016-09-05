/**
 * Image model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Image = require('./image.model');
var ImageEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ImageEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Image.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ImageEvents.emit(event + ':' + doc._id, doc);
    ImageEvents.emit(event, doc);
  }
}

module.exports = ImageEvents;
