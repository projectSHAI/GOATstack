/**
 * Broadcast updates to client when the model changes
 */

import WonderEvents from './wonder.events';

// Model events to emit
let events = ['save', 'remove'];

function register(socket) {
  // Bind model events to socket events
  for (let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    let event = events[i];
    let listener = createListener('Wonder:' + event, socket);

    WonderEvents.on(event, listener);
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
    WonderEvents.removeListener(event, listener);
  };
}

export {register as wonderRegister};
