/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
import Wonder from '../../server/api/wonder/wonder.model';
import User from '../../server/api/user/user.model';

function seed() {
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
          name: 'Redux',
          xcoor: 15,
          ycoor: 35
        }, {
          name: 'Protractor',
          xcoor: 50,
          ycoor: 15
        });
    });
}

export {seed as seedProd};
