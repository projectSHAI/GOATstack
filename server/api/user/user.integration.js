'use strict';

var app = require('../../server.js').get('address');
var User = require('./user.model');
var request = require('supertest');

describe('User API:', function () {
  var user;
  var token;

  // Clear users before testing
  beforeAll(function () {
    return User.remove().then(function () {
      user = new User({
        userName: 'MrFakie',
        firstName: 'Fake',
        lastName: 'Fakie',
        email: 'test@example.com',
        password: 'password'
      });

      return user.save();
    });
  });

  describe('GET /api/users/me', function () {

    beforeAll(function (done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          } else {
            token = res.body.token;
            done();
          }
        });
    });

    it('should respond with a user profile when authenticated', function (done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body._id.toString()).toEqual(user._id.toString());
            expect(res.body.userName).toEqual(user.userName);
            expect(res.body.firstName).toEqual(user.firstName);
            expect(res.body.lastName).toEqual(user.lastName);
            expect(res.body.email).toEqual(user.email);
            done();
          }
        });
    });

    it('should respond with a 401 when not authenticated', function (done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          } else {
            done();
          }
        });
    });
  });
});
