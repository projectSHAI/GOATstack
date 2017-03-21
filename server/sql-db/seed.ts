/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import User from './api/_user/user.model';

export default function seed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":
      User.sync().then(() =>{
            User.destroy({truncate: true, cascade: true}).then(() => {
                User.create({
                  username: 'AdMiN',
                  firstname:'admin',
                  lastname: 'admin',
                  email:    'admin@admin.com',
                  role:     'admin',
                  password: 'admin1'
                }).then(() => {
                    User.create({
                      username: 'test',
                      firstname:'testFirst',
                      lastname: 'testLast',
                      email:    'test@test.com',
                      role:     'user',
                      password: 'test'
                    }).catch(() => {});
                }).catch(() => {});  
            }).catch(err => console.log('this is the User destroy err', err.message));   
          }).catch(err => console.log(err.message));

      break;
    case "test":
      User.sync().then(() =>{
            User.destroy({truncate: true, cascade: true}).then(() => {
                User.create({
                  username: 'test',
                  firstname:'testFirst',
                  lastname: 'testLast',
                  email:    'test@test.com',
                  role:     'user',
                  password: 'test'
                }).catch(() => {});
            }).catch(err => console.log(err.message));                
        }).catch(err => console.log(err.message));
      break;
    default:
      // code...
      break;
  }

}
