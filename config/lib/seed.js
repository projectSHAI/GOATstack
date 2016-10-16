/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Wonder = require('../../dist/api/wonder/wonder.model');
var User = require('../../dist/api/user/user.model');

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
