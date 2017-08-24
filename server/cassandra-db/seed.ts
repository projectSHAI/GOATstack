/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import { client } from '../cassandra-db';
import DbModel from './db.model';
import UserModel from './api/user/user.model';
import { insertUser } from './api/user/prepared.statements';

export default function cassandraSeed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":
      DbModel.seed(DbModel.devKeyspace, DbModel.usersTable, DbModel.truncateUsers, DbModel.seedUsers);
      break;
    case "test":
      DbModel.seed(DbModel.testKeyspace, DbModel.usersTable, DbModel.truncateUsers, DbModel.seedUsers);
      break;
    default:
      // code... for production and others
      break;
  }

}
