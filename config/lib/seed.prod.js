/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Wonder = require('../../server/api/wonder/wonder.model');
var User = require('../../server/api/user/user.model');

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
