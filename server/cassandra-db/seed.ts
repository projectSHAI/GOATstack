/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import { client } from '../cassandra-db';
import UserModel from './api/user/user.model';
import { devKeyspace, testKeyspace, usersTable, truncateUsers } from './prepared.statements';

export default function cassandraSeed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":

      client.execute(devKeyspace, (err, result) => {
        if(err)
          console.error('error', err);

        client.execute(usersTable, (err, result) => {
          if(err)
            console.error('error', err);

          client.execute(truncateUsers, (err, result) => {
            if(err)
              console.error('error', err);
            
            UserModel.createUser('admin@admin.com', 'admin1', 'AdMiN', 'admin').subscribe(x => { }, err => console.log(err));
            UserModel.createUser('test@test.com', 'test', 'test', 'user').subscribe(x => { }, err => console.log(err));
          });
        });
      });
      break;
    case "test":
      client.execute(testKeyspace, (err, result) => {
        if(err)
          console.error('error', err);

        client.execute(usersTable, (err, result) => {
          if(err)
            console.error('error', err);

          client.execute(truncateUsers, (err, result) => {
            if(err)
              console.error('error', err);
            
            UserModel.createUser('admin@admin.com', 'admin1', 'AdMiN', 'admin').subscribe(x => { }, err => console.log(err));
            UserModel.createUser('test@test.com', 'test', 'test', 'user').subscribe(x => { }, err => console.log(err));
          });
        });
      });
      break;
    default:
      // code... for production and others
      break;
  }

}
