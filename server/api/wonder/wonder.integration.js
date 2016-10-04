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

    describe('Input Wonders', () => {
      for (var counter = 0; counter < inputs.length; counter++) {
        (function (input) {
          it('should respond back with inputted wonder: ' + input, (done) => {
            request(app)
              .post('/api/wonders')
              .send({
                name: 'wonder: ' + input
              })
              .expect(200)
              .expect('Content-Type', /json/)
              .end((err, res) => {
                if (err) {
                  done.fail(err);
                }
                expect(res.body.name).toEqual('wonder: ' + input);
                done();
              });
          });
        })(inputs[counter]);
      }
    });

    describe('Gather Wonders Array', () => {
      it('should respond back with all current wonders', (done) => {
        request(app)
          .get('/api/wonders')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) {
              done.fail(err);
            }
            wonders = res.body;

            expect(wonders).toEqual(jasmine.any(Array));
            expect(wonders.length).toEqual(20);

            done();
          });
      });
    });

    describe('Check Wonders Response Array', () => {
      for (var i = 0; i < 20; i++) {
        (function (input, counter) {
          it('wonders[' + counter + '] should equal wonder: ' + input, (done) => {
            expect(wonders[counter].name).toEqual('wonder: ' + input)
            done();
          });
        })(inputs[i + 3], (i + 3) % 20)
      }
    });

  });
});
