const cassandra = require('cassandra-driver');
import config from '../../config';

import * as Rx from 'rxjs';

export const client = new cassandra.Client(config.cassandra);

// Initialize Express-Cassandra
export function cassandraConnect(): Rx.Observable<any> {
  return Rx.Observable.create(observer => {

    client.connect(function (err) {
      if (err) {
        observer.error(err);
      }
      observer.next();
      observer.complete();
    });

  });
};

export function cassandraDisconnect() {
  client.shutdown(() => {
    console.log('Cassandra DB is now shutdown.');
  });
};

