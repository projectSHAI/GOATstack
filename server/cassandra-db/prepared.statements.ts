import { client } from '../cassandra-db';
const Uuid = require('cassandra-driver').types.Uuid;

//keyspaces
export const devKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };`;
export const testKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };`;

// create tables
export const usersTable: string = `CREATE TABLE IF NOT EXISTS users (
    id uuid,
      email text,
      created timestamp,
      password text,
      salt text,
      facebook text,
      firstname text,
      github text,
      google text,
      lastname text,
      middlename text,
      role text,
      username text,
      PRIMARY KEY (email)
  );`;

// delete tables
export const truncateUsers: string = `TRUNCATE users`;

// seed

export const seedUsers: Array<{ query: string, params: Array<string> }> = [{
  query: 'INSERT INTO users (id, email, created, password, salt, role, username ) VALUES (?, ?, ?, ?, ?, ?, ?)',
  params: [Uuid.random(), 'admin@admin.com', Date.now(), 'admin1', '12364', 'admin', 'AdMiN']
},
{
  query: 'INSERT INTO users (id, email, created, password, salt, role, username ) VALUES (?, ?, ?, ?, ?, ?, ?)',
  params: [Uuid.random(), 'test@test.com', Date.now(), 'test', '12364', 'test', 'test']
}];