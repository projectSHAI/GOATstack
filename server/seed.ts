/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import User from './api/user/user.model';

function seed(env?: string): void {
  // Insert seeds below
  switch (env) {
    case "prod":
      // code...
      break;
    
    default:
      User.find({}).remove().then(() => {
        User.create({
          userName: 'AdMiN',
          firstName: 'admin',
          lastName: 'admin',
          email: 'admin@admin.com',
          password: 'admin1'
        }, {
          userName: 'test',
          firstName: 'testFirst',
          lastName: 'testLast',
          email: 'test@test.com',
          password: 'test'
        });
      });
      break;
  }

}

export default seed;
