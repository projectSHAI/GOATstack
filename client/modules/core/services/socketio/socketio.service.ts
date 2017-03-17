import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../redux/store';

import * as _ from 'lodash';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  socket;

  constructor(private ngRedux: NgRedux<IAppState>) {
    // socket.io now auto-configures its connection when we ommit a connection url
    this.socket = io.connect({ path: '/socket.io-client' });
  }

  /**
   * Register listeners to sync an array with updates on a model
   *
   * Takes the array we want to sync, the model name that socket updates are sent from,
   * and an optional callback function after new items are updated.
   *
   * modelName: The server model with atached socket listener
   * array: model array from service subscription
   * stateArray: Redux states that this syncUpdates instance will invoke
   *    index 0: update/add-state, index 1: remove-state
   * cb: callback function, will be invoked after redux dispatch
   * bcb: beforeCallback function, will be invoked before redux dispatch
   * dpDelay: dispatch delay, give dp time until dispatch is called
   *    NOTE: bcb will be called immidiately, dispatch will wait dp to execute
   */
  syncUpdates(modelName: string, array: any, stateArray: Array<string>, cb?, bcb?, dpDelay?: number) {
    /**
     * Syncs item creation/updates on 'model:save'
     */
    this.socket.on(modelName + ':save', (item) => {
      const oldItem = _.find(array, { _id: item._id });
      const index = array.indexOf(oldItem);

      let event: string = 'created';
      let isNew: boolean;

      // replace oldItem if it exists
      // otherwise just add item to the collection
      if (oldItem) {
        // Update store with new object
        isNew = false;
        event = 'updated';
      } else {
        // Finds the model for the listener
        // and pushes a new object to store
        isNew = true;
      }

      // create beforCall observable and set the delay to specified time
      const bcbObs = Observable.of(true).map(() => bcb ? bcb(item, index, event) : null).delay(dpDelay ? dpDelay : 0);
      //create the normal socketio execution observable
      const nowObs = Observable.of(true).map(() => {
        this.ngRedux.dispatch({ type: stateArray[0], payload: { index: index, object: item, isNew: isNew } });
      });
      // create callback observable
      const cbObs = Observable.of(true).map(() => cb ? cb(item, index, event) : null);
      // concatonate all observables in proper order and subscribe to execute
      return Observable.concat(bcbObs, nowObs, cbObs).subscribe();
    });

    /**
     * Syncs removed items on 'model:remove'
     */
    this.socket.on(modelName + ':remove', (item) => {
      const event = 'deconsted';
      const oldItem = _.find(array, { _id: item._id });
      const index = array.indexOf(oldItem);
      _.remove(array, { _id: item._id });

      const nowObserv = Observable.of(true).map(() => {
        this.ngRedux.dispatch({ type: stateArray[1], payload: { index: index, object: item } });
      });
      const cbObserv = Observable.of(true).map(() => cb ? cb(item, index, event) : null);

      return Observable.concat(nowObserv, cbObserv).subscribe();
    });
  }

  /**
   * Removes listeners for a models updates on the socket
   */
  unsyncUpdates(modelName: string) {
    this.socket.removeListener(modelName + ':save');
    this.socket.removeListener(modelName + ':remove');
  }


}
