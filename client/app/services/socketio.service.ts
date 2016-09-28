import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as SocketFactory from 'socket.io';
import * as _ from 'lodash';

@Injectable()
export class SocketService {
    // private url = 'http://localhost:5000';

    constructor() {
        // socket.io now auto-configures its connection when we ommit a connection url
        var socket = io('http://localhost:5000', {
            // Send auth token on connection, you will need to DI the Auth service above
            // 'query': 'token=' + Auth.getToken()
            path: '/socket.io'
        });

        // var socket = SocketFactory({ ioSocket });

        return {
            socket,

            /**
             * Register listeners to sync an array with updates on a model
             *
             * Takes the array we want to sync, the model name that socket updates are sent from,
             * and an optional callback function after new items are updated.
             *
             * @param {String} modelName
             * @param {Array} array
             * @param {Function} cb
             */
            syncUpdates(modelName: string, array: any, cb) {
                cb = cb || null;
                /**
                 * Syncs item creation/updates on 'model:save'
                 */
                socket.on(modelName + ':save', function(item) {
                    var oldItem = _.find(array, { _id: item._id });
                    var index = array.indexOf(oldItem);
                    var event = 'created';

                    // replace oldItem if it exists
                    // otherwise just add item to the collection
                    if (oldItem) {
                        array.splice(index, 1, item);
                        event = 'updated';
                    } else {
                        array.push(item);
                    }

                    cb(event, item, array);
                });

                /**
                 * Syncs removed items on 'model:remove'
                 */
                socket.on(modelName + ':remove', function(item) {
                    var event = 'deleted';
                    _.remove(array, { _id: item._id });
                    cb(event, item, array);
                });
            },

            /**
             * Removes listeners for a models updates on the socket
             *
             * @param modelName
             */
            unsyncUpdates(modelName) {
                socket.removeListener(modelName + ':save');
                socket.removeListener(modelName + ':remove');
            }
        };
    }
}
