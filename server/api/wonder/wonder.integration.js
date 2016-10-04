/*jshint loopfunc: true */

'use strict';

var app = require('../../server.js').get('address');
var request = require('supertest');

describe('Wonder API:', function () {
  var newWonder;
  var wonders;

  const inputs = [1, 43, 2, 35, 65, 36, 10, 57, 32, 45, 90, 79, 32, 47, 19, 14, 30, 15, 69, 25, 50, 38, 29];

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

    for (var counter = 0; counter < inputs.length; counter++) {
      (function (input, output, counter) {
        describe('wonder input', () => {

          beforeAll((done) => {
            request(app)
              .post('/api/wonders')
              .send({
                name: 'wonder: ' + inputs[counter]
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

          beforeAll((done) => {
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

          it('should respond with the correct wonder: ' + input + ' at index: ' + output, () => {
            expect(wonders[output].name).toEqual('wonder: ' + input);
          });
        })
      })(inputs[counter], counter % 20, counter)
    }

  });
});
