import { connect } from 'cassmask';
import config from '../../config';

import * as Rx from 'rxjs';

// Initialize Express-Cassandra
export function cassandraConnect(): Rx.Observable<any> {
  return Rx.Observable.create(observer => {

    connect(config.cassandra, function (err, result) {
      if(err) {
        observer.error(err);
      }
      observer.next();
      observer.complete();
    });

  });
};
export function cassandraDisconnect() {

};
