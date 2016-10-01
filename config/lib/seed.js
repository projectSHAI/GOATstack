/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// var Thing = require('../../server/api/thing/thing.model');
var Wonder = require('../../server/api/wonder/wonder.model');
var User = require('../../server/api/user/user.model');

// Thing.find({}).remove()
//   .then(() => {
//     Thing.create({
//       name: 'Development Tools',
//       info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
//         'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
//         'Stylus, Sass, and Less.'
//     }, {
//       name: 'Server and Client integration',
//       info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
//         'AngularJS, and Node.'
//     }, {
//       name: 'Smart Build System',
//       info: 'Build system ignores `spec` files, allowing you to keep ' +
//         'tests alongside code. Automatic injection of scripts and ' +
//         'styles into your index.html'
//     }, {
//       name: 'Modular Structure',
//       info: 'Best practice client and server structures allow for more ' +
//         'code reusability and maximum scalability'
//     }, {
//       name: 'Optimized Build',
//       info: 'Build process packs up your templates as a single JavaScript ' +
//         'payload, minifies your scripts/css/images, and rewrites asset ' +
//         'names for caching.'
//     }, {
//       name: 'Deployment Ready',
//       info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
//         'and openshift subgenerators'
//     });
//   });

Wonder.find({}).remove()
  .then(() => {
    Wonder.create({
      name: 'PeanutButter',
      xcoor: 10,
      ycoor: 10
    }, {
      name: 'Jelly',
      xcoor: 20,
      ycoor: 12
    }, {
      name: 'Jelly',
      xcoor: 25,
      ycoor: 13
    }, {
      name: 'Jelly',
      xcoor: 40,
      ycoor: 5
    }, {
      name: 'Jelly',
      xcoor: 75,
      ycoor: 80
    }, {
      name: 'Jelly',
      xcoor: 25,
      ycoor: 75
    }, {
      name: 'Jelly',
      xcoor: 15,
      ycoor: 80
    }, {
      name: 'Jelly',
      xcoor: 13,
      ycoor: 74
    }, {
      name: 'Jelly',
      xcoor: 15,
      ycoor: 65
    }, {
      name: 'Jelly',
      xcoor: 15,
      ycoor: 64
    }, {
      name: 'Jelly',
      xcoor: 78,
      ycoor: 64
    }, {
      name: 'Jelly',
      xcoor: 97,
      ycoor: 13
    }, {
      name: 'Jelly',
      xcoor: 54,
      ycoor: 21
    }, {
      name: 'Jelly',
      xcoor: 37,
      ycoor: 91
    }, {
      name: 'Jelly',
      xcoor: 64,
      ycoor: 54
    }, {
      name: 'Jelly',
      xcoor: 32,
      ycoor: 23
    }, {
      name: 'Jelly',
      xcoor: 45,
      ycoor: 82
    }, {
      name: 'Jelly',
      xcoor: 60,
      ycoor: 30
    }, {
      name: 'Jelly',
      xcoor: 12,
      ycoor: 40
    }, {
      name: 'Jelly',
      xcoor: 25,
      ycoor: 11
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
    });
  });
