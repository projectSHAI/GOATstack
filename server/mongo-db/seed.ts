/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import User from './api/user/user.model';

export default function mongoSeed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":
      User.find({}).remove().then(() => {
        User.create({
          username: 'AdMiN',
          firstname: 'admin',
          lastname: 'admin',
          email: 'admin@admin.com',
          password: 'admin1'
        }, {
          username: 'test',
          firstname: 'testFirst',
          lastname: 'testLast',
          email: 'test@test.com',
          password: 'test'
        });
      }).catch(error => console.log(error));
      break;
    case "test":
      User.find({}).remove().then(() => {
        User.create({
          username: 'test',
          firstname: 'testFirst',
          lastname: 'testLast',
          email: 'test@test.com',
          password: 'test'
        });
      }).catch(error => console.log(error));      
      break;
    default:
      // code...
      break;
  }

}
