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
          xcoor: 52,
          ycoor: 15
        }, {
          name: 'MongoDB',
          xcoor: 35,
          ycoor: 35
        }, {
          name: 'Angular 2',
          xcoor: 10,
          ycoor: 65
        }, {
          name: 'Karma',
          xcoor: 16,
          ycoor: 40
        }, {
          name: 'Express',
          xcoor: 58,
          ycoor: 50
        }, {
          name: 'Jasmine',
          xcoor: 75,
          ycoor: 55
        }, {
          name: 'OAuth',
          xcoor: 40,
          ycoor: 60  
        }, {
          name: 'Node',
          xcoor: 5,
          ycoor: 15
        }, {
          name: 'Redux',
          xcoor: 70,
          ycoor: 20
        }, {
          name: 'Protractor',
          xcoor: 26,
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
