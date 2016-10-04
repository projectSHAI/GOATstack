/*jshint loopfunc: true */

'use strict';

var app = require('../../server.js').get('address');
var request = require('supertest');

describe('Wonder API:', function () {
  var newWonder;
  var wonders;

  describe('GET /api/wonders', function () {
    beforeAll(function (done) {
      request(app)
        .get('/api/wonders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          wonders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function () {
      expect(wonders).toEqual(jasmine.any(Array));
    });
  });

  describe('POST /api/wonders', function () {
    var loop = function (counter) {
      describe('wonder input', function () {

        beforeAll(function (done) {
          request(app)
            .post('/api/wonders')
            .send({
              name: 'wonder: ' + counter % 8
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) {
                done.fail(err);
              }
              newWonder = res.body;
              done();
            });
        });

        beforeAll(function (done) {
          request(app)
            .get('/api/wonders')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) {
                done.fail(err);
              }
              wonders = res.body;
              done();
            });
        });


        it('should respond with the correct wonder: ' + counter % 8 + ' at index: ' + counter % 20, function () {
          expect(wonders[counter % 20].name).toEqual('wonder: ' + counter % 8);
        });
      });
    };

    for (var i = 0; i < 23; i++) {
      loop(i);
    }
  });
});
