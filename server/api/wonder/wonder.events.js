/**
 * Wonder model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Wonder = require('./wonder.model');
var WonderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WonderEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Wonder.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WonderEvents.emit(event + ':' + doc._id, doc);
    WonderEvents.emit(event, doc);
  }
}

module.exports = WonderEvents;
