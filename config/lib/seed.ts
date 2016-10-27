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
          name: 'SocketIO',
          xcoor: 20,
          ycoor: 25
        }, {
          name: 'MongoDB',
          xcoor: 20,
          ycoor: 35
        }, {
          name: 'Angular 2',
          xcoor: 25,
          ycoor: 45
        }, {
          name: 'Karma',
          xcoor: 40,
          ycoor: 18
        }, {
          name: 'Express',
          xcoor: 60,
          ycoor: 65
        }, {
          name: 'Jasmine',
          xcoor: 80,
          ycoor: 55
        }, {
          name: 'OAuth',
          xcoor: 15,
          ycoor: 35
        }, {
          name: 'Node',
          xcoor: 13,
          ycoor: 40
        }, {
          name: 'Gulp',
          xcoor: 15,
          ycoor: 35
        }, {
          name: 'Protractor',
          xcoor: 50,
          ycoor: 15
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
          firstName: 'testFirst',
          lastName: 'testLast',
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
