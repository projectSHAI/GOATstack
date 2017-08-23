/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import { client } from '../cassandra-db';
import { query } from './query';
import UserModel from './api/user/user.model';
import { devKeyspace, testKeyspace, usersTable, truncateUsers } from './prepared.statements';
import { insertUser } from './api/user/prepared.statements';

export default function cassandraSeed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":

      query(devKeyspace).then((result) => {
        query(usersTable).then((result) => {
          query(truncateUsers).then((result) => {
            query(insertUser, ['test@test.com', 'test', 'test', 'user']).subscribe(x => { }, err => console.log(err));
          }, (err) => {
            if(err)
              console.error('error', err);
          });
        }, (err) => {
            console.error('Error(usersTable query)', err);
        });
      }, err => {
        if(err)
          console.error('Error(devKeypace query)', err);
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
