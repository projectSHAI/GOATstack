/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import Wonder from '../../server/api/wonder/wonder.model';
import User from '../../server/api/user/user.model';

export function seed() {
  Wonder.find({}).remove()
    .then(() => {
      Wonder.create(
        {
          name: 'PeanutButter',
          xcoor: 20,
          ycoor: 10
        }, {
          name: 'Jelly',
          xcoor: 20,
          ycoor: 30
        }, {
          name: 'Jelly',
          xcoor: 25,
          ycoor: 14
        }, {
          name: 'Jelly',
          xcoor: 40,
          ycoor: 18
        }, {
          name: 'Jelly',
          xcoor: 60,
          ycoor: 61
        }, {
          name: 'Jelly',
          xcoor: 80,
          ycoor: 40
        }, {
          name: 'Jelly',
          xcoor: 15,
          ycoor: 35
        }, {
          name: 'Jelly',
          xcoor: 13,
          ycoor: 55
        }, {
          name: 'Jelly',
          xcoor: 15,
          ycoor: 35
        }, {
          name: 'PeanutButter And Jelly',
          xcoor: 50,
          ycoor: 12
        });
    });

  User.find({}).remove()
    .then(() => {
      User.create({
        userName: 'AdMiN',
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: 'admin1'
      }, {
          userName: 'test',
          firstName: 'test',
          lastName: 'testlast',
          email: 'test@test.com',
          password: 'test'
        }, {
          userName: 'Atheteo',
          firstName: 'Jason',
          lastName: 'Thomas',
          email: 'jc.thomas4214@gmail.com',
          password: 'flight1855'
        });
    });
}
