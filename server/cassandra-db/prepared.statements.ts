import { client } from '../cassandra-db';

//keyspaces
export const devKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };`;
export const testKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };`;