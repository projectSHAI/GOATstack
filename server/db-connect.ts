import { mongoConnect, mongoDisconnect } from './mongo-db';
import { cassandraConnect, cassandraDisconnect } from './cassandra-db';
import { sequelizeConnect, sequelizeDisconnect } from './sql-db';

export function connect() {
  // mongoConnect();
  cassandraConnect();
  // sequelizeConnect();
}

export function disconnect() {
  // mongoDisconnect();
  cassandraDisconnect();
  // sequelizeDisconnect();
}
