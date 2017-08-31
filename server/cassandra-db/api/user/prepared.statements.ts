////////////////////////
// Prepared statements//
////////////////////////
const Uuid = require('cassandra-driver').types.Uuid;
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

///////////////////////
// Seeding ////////////
///////////////////////
// seed statements
export const seedUsers: Array<{ query: string, params: Array<string> }> = [{
query: 'INSERT INTO users (id, email, created, password, salt, role, username ) VALUES (?, ?, ?, ?, ?, ?, ?)',
params: [Uuid.random(), 'admin@admin.com', Date.now(), 'fUnz3sNJaiLSotLsOX0kqBuYD9MH9lotMyAdBtbCyPBnFToAABMPqxv4kZ/E16gk/zp6/rtBEOnQZsPSnS1LmQ==', 'Lv1oeSSHMut0kKRFFDyk5g==', 'admin', 'AdMiN']
},
{
query: 'INSERT INTO users (id, email, created, password, salt, role, username ) VALUES (?, ?, ?, ?, ?, ?, ?)',
params: [Uuid.random(), 'test@test.com', Date.now(), 'JOe+CGVaNXUK2wZuOLzhpiCfXO8K/18R5mhoE5ji5MGcxMF/otA3QaLeMa9ELw0W8zyr0VvQbW9NHpA350MGbg==', '61DynVS8QOWjMy7bRdkUtw==', 'test', 'test']
}];

// test seed statements
export const testUser: Array<{ query: string, params: Array<string> }> = [{
query: 'INSERT INTO users (id, email, created, password, salt, role, username ) VALUES (?, ?, ?, ?, ?, ?, ?)',
params: [Uuid.random(), 'test@test.com', Date.now(), 'JOe+CGVaNXUK2wZuOLzhpiCfXO8K/18R5mhoE5ji5MGcxMF/otA3QaLeMa9ELw0W8zyr0VvQbW9NHpA350MGbg==', '61DynVS8QOWjMy7bRdkUtw==', 'test', 'test']
}];

////////////
// queries//
////////////

// create
export const insertUser: string = `INSERT INTO users (id, email, created, password, salt, role, username ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
// read
export const findByEmail: string = 'SELECT email, firstname, lastname, middlename, role, username FROM users WHERE email = ?';
export const allUsers: string = 'SELECT email, firstname, lastname, middlename, role, username FROM users';
// update - NA
// delete - NA