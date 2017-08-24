import { client } from '../cassandra-db';
import * as assert from 'assert';

const Uuid = require('cassandra-driver').types.Uuid;

class DbModel {
    ///////////////////////
    //prepared statements//
    ///////////////////////
    //keyspaces
    public devKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
        'class' : 'SimpleStrategy',
        'replication_factor' : 1
    };`;
    public testKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
        'class' : 'SimpleStrategy',
        'replication_factor' : 1
    };`;

    // create tables
    public usersTable: string = `CREATE TABLE IF NOT EXISTS users (
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
    public truncateUsers: string = `TRUNCATE users`;

    // seed
    public seedUsers: Array<{ query: string, params: Array<string> }> = [{
        query: 'INSERT INTO users (id, email, created, password, salt, role, username ) VALUES (?, ?, ?, ?, ?, ?, ?)',
        params: [Uuid.random(), 'admin@admin.com', Date.now(), 'admin1', '12364', 'admin', 'AdMiN']
    },
    {
        query: 'INSERT INTO users (id, email, created, password, salt, role, username ) VALUES (?, ?, ?, ?, ?, ?, ?)',
        params: [Uuid.random(), 'test@test.com', Date.now(), 'test', '12364', 'test', 'test']
    }];

    /////////////////
    //seed function//
    /////////////////
    public seed(keyspace: string, table: string, truncate: string, queries: Array<{ query: string, params: Array<any> }>, cb: (err, result) => any = (err, result) => {assert.ifError(err); console.log('Insert user batch success');} ) {
        return client.execute(keyspace, (err, result) => {
            assert.ifError(err);
            client.execute(table, (err, result) => {
                assert.ifError(err);
                client.execute(truncate, (err, result) => {
                    assert.ifError(err);
                    client.batch(queries, cb);
                });
            });
        });
    }
}



export default new DbModel;