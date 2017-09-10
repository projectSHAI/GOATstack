/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import { client } from '../cassandra-db';
import DbModel from './db.model';
import DbStmts from './prepared.statements';
import UserStmts from './api/user/prepared.statements';

// Define Prepared Statments
const devKeyspace: string = DbStmts.devKeyspace;
const testKeyspace: string = DbStmts.testKeyspace;
const userTable: string = UserStmts.userTable;
const truncateUserTable: string = UserStmts.truncateUserTable;
const seedUserTable: Array<{ query: string, params: Array<string> }> = UserStmts.seedUserTable;
const quertOptions: object = {prepared: true};


export default function cassandraSeed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":
      DbModel.keyspace(devKeyspace)
        .then(result => {
          console.log('Dev keyspace ready to seed!');
          // list all your batch queries here by table
          DbModel.seed(userTable, truncateUserTable, seedUserTable, this.queryOptions)
            .then(result => console.log('User Table seeded succesfully!'))
            .catch(err => console.error(err));

        })
        .catch(err => console.error(err));
      break;
    case "test":
      DbModel.keyspace(testKeyspace)
        .then(result => {
          console.log('Test keyspace ready to seed!');

          // list all your batch queries here by table
          DbModel.seed(userTable, truncateUserTable, seedUserTable, this.queryOptions)
            .then(result => console.log('User Table seeded succesfully!'))
            .catch(err => console.error(err));

        })
        .catch(err => console.error(err));
      break;
    default:
      // code... for production and others
      break;
  }

}
