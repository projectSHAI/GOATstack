/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import { client } from '../cassandra-db';
import DbModel from './db.model';
import UserModel from './api/user/user.model';
import { devKeyspace, testKeyspace } from './prepared.statements';
import { usersTable, truncateUsers, seedUsers } from './api/user/prepared.statements';
import { insertUser } from './api/user/prepared.statements';

export default function cassandraSeed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":
      DbModel.seed(devKeyspace, usersTable, truncateUsers, seedUsers)
        .then(result => console.log('Dev keyspace seeded successfully!'))
        .catch(err => console.error(err));
      break;
    case "test":
      DbModel.seed(testKeyspace, usersTable, truncateUsers, seedUsers)
        .then(result => console.log('Test keyspace seeded successfully!'))
        .catch(err => console.error(err));
      break;
    default:
      // code... for production and others
      break;
  }

}
