/**
 * Wonder model events
 */
import Wonder from './wonder.model';

let EventEmitter = require('events').EventEmitter;
let WonderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WonderEvents.setMaxListeners(0);

// Model events
let events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Wonder.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WonderEvents.emit(event + ':' + doc._id, doc);
    WonderEvents.emit(event, doc);
    console.log('testing emit');
  };
}

export default WonderEvents;
