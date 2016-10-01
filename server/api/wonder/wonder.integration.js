/*jshint loopfunc: true */

'use strict';

var app = require('../../server.js');
var request = require('supertest');

describe('Wonder API:', function () {
  var newWonder;
  var wonders;

  describe('GET /api/wonders', function () {
    before(function (done) {
      request(app)
        .get('/api/wonders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          wonders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function () {
      expect(wonders).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/wonders', function () {
    var loop = function (counter) {
      describe('wonder input', function () {

        before(function (done) {
          request(app)
            .post('/api/wonders')
            .send({
              name: 'wonder: ' + counter % 8
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              newWonder = res.body;
              done();
            });
        });

        before(function (done) {
          request(app)
            .get('/api/wonders')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              wonders = res.body;
              done();
            });
        });


        it('should respond with the correct wonder: ' + counter % 8 + ' at index: ' + counter % 20, function () {
          expect(wonders[counter % 20].name).to.equal('wonder: ' + counter % 8);
        });
      });
    };

    for (var i = 0; i < 23; i++) {
      loop(i);
    }
  });
});
