import { mongoConnect, mongoDisconnect } from './mongo-db';
import { cassandraConnect, cassandraDisconnect } from './cassandra-db';
import { postgresConnect, postgresDisconnect } from './postgres-db';

export function connect() {
  mongoConnect();
  // cassandraConnect();
  // postgresConnect();
}

export function disconnect() {
  mongoDisconnect();
  // cassandraDisconnect();
  // postgresDisconnect();
}
