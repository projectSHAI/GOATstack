/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

import User from './api/user/user.model';

export default function cassandraSeed(env?: string) : void {

  // Insert seeds below
  switch (env) {
    case "development":
      User.remove().create([{
          email: 'admin@admin.com',
          firstname: 'admin',
          lastname: 'admin',
          username: 'AdMiN',
          password: 'admin1',
          role: 'admin'
        }, {
          email: 'test@test.com',
          firstname: 'testFirst',
          lastname: 'testLast',
          username: 'test',
          password: 'test'
        }]).seam().subscribe(x => {}, err => console.log(err));
      break;
    case "test":
      User.remove().create({
          email: 'test@test.com',
          firstname: 'testFirst',
          lastname: 'testLast',
          username: 'test',
          password: 'test'
        }).seam().subscribe(x => {}, err => console.log(err));
      break;
    default:
      // code... for production and others
      break;
  }

}
