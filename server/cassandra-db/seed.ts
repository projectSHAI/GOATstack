/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import { client } from '../cassandra-db';
import DbModel from './db.model';
import UserModel from './api/user/user.model';
import { devKeyspace, testKeyspace, usersTable, truncateUsers, seedUsers } from './prepared.statements';
import { insertUser } from './api/user/prepared.statements';

export default function cassandraSeed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":
      DbModel.query(devKeyspace)
        .then((result) => {
          DbModel.query(usersTable)
            .then((result) => {
              DbModel.query(truncateUsers)
                .then((result) => {
                  DbModel.batch(seedUsers)
                    .then(result => console.log('Insert user batch success'), err => console.error(err))
                }, (err) => console.error('error', err))
            }, (err) => console.error('Error(usersTable query)', err))
        }, err => console.error('Error(devKeypace query)', err));
      break;
    case "test":
      DbModel.query(testKeyspace)
        .then((result) => {
          DbModel.query(usersTable)
            .then((result) => {
              DbModel.query(truncateUsers)
                .then((result) => {
                  DbModel.batch(seedUsers)
                    .then(result => console.log('Insert user batch success'), err => console.error(err))
                }, (err) => console.error('error', err))
            }, (err) => console.error('Error(usersTable query)', err))
        }, err => console.error('Error(devKeypace query)', err));
      break;
    default:
      // code... for production and others
      break;
  }

}
