/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import User from './api/user/user.model';

export default function seed(env?: string): void {

  // Insert seeds below
  switch (env) {
    case "development":
    User.sync({force: true}).then(() =>{
          User.destroy({where: {}}).then(() => {
              User.create({
                username: 'AdMiN',
                firstname:'admin',
                lastname: 'admin',
                email:    'admin@admin.com',
                role:     'admin',
                password: 'admin1'
              }).then(() => {
                        User.create({
                          username: 'a',
                          firstname:'a',
                          lastname: 'a',
                          email:    'a',
                          role:     'a',
                          password: 'a'
                        });
              });
            });      
        }).then(() => console.log('success')).catch(err => console.log(err.message));

      break;
    case "test":
    User.sync({force: true}).then(() =>{
        User.destroy({where: {}}).then(() => {
            User.create({
              username: 'test',
              firstname: 'testFirst',
              lastname: 'testLast',
              email: 'test@test.com',
              password: 'test'
            }).then(() => {
                        User.create({
                          username: 'AdMiN',
                          firstname:'admin',
                          lastname: 'admin',
                          email:    'admin@admin.com',
                          role:     'admin',
                          password: 'admin1'
                        });
              });
          });
      }).then(() => console.log('success')).catch(err => console.log(err.message));
      break;
    default:
      // code...
      break;
  }

}
