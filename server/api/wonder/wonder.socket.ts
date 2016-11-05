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

    // the Emiter will listen for changes in the model
    WonderEvents.on(event, listener);
    // when a disconnect comes from the socket then remove the listener
    socket.on('disconnect', removeListener(event, listener));
  }
}

// create listener funtion
function createListener(event, socket) {
  return function(doc) {
    // not sure
    socket.emit(event, doc);
  };
}

// remove listener function
function removeListener(event, listener) {
  return function() {
    // in certain events come from the client, disconnect listener
    WonderEvents.removeListener(event, listener);
  };
}

// export the es6 way 
export {register as wonderRegister};
