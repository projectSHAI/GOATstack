import app = require('../../server');
import request = require('supertest');

let User = require('./user.model');

let addr = app.get('address');

describe('User API:', function () {
  let user;
  let token;

  // Clear users before testing
  beforeAll(function () {
    user = new User({
      userName: 'MrFakie',
      email: 'Fakie@mrfake.com',
      password: 'mrfakie'
    });
    return user.save();
  });

  describe('GET /api/users/me', function () {

    beforeAll(function (done) {
      request(addr)
        .post('/auth/local')
        .send({
          email: 'Fakie@mrfake.com',
          password: 'mrfakie'
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
      request(addr)
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
      request(addr)
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
