/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CollectionEvents = require('./collection.events');

// Model events to emit
var events = ['save', 'remove'];

module.exports.register = function (socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('collection:' + event, socket);

    CollectionEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    CollectionEvents.removeListener(event, listener);
  };
}
