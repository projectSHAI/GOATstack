import { mongoConnect, mongoDisconnect } from './mongo-db';
import { cassandraConnect, cassandraDisconnect } from './cassandra-db';
import { sequelizeConnect, sequelizeDisconnect } from './sql-db';

import * as Rx from 'rxjs';

export function connect(): Rx.Observable<any> {
	let obs = [];
	obs.push(mongoConnect());
	obs.push(cassandraConnect());
	obs.push(sequelizeConnect());

	return obs.length > 1 ? Rx.Observable.merge.apply(this, obs) : obs[0];
}

export function disconnect() {
	mongoDisconnect();
	cassandraDisconnect();
	sequelizeDisconnect();
}
