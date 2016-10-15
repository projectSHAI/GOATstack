/*jshint loopfunc: true */

'use strict';

import app = require('../../server.js');
import request = require('supertest');

describe('Wonder API:', function () {
  let newWonder;
  let wonders;

  const inputs = [1, 43, 2, 35, 65, 36, 10, 57, 32, 45, 90, 79, 32, 47, 19, 14, 30, 15, 69, 25, 50, 38, 29];

  describe('POST /api/wonders', function () {
    for (let counter = 0; counter < inputs.length; counter++) {
      (function (input) {
        return beforeAll((done) => {
          request(app.get('address'))
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

    it('should respond back each query with inputted wonder', () => {
      expect(true).toEqual(true);
    });
  });

  describe('GET /api/wonders', function () {
    beforeAll(function (done) {
      request(app.get('address'))
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

    it('wonders should equal the original input array', () => {
      for (let i = 0; i < 20; i++) {
        (function (input, counter) {
          return expect(wonders[counter].name).toEqual('wonder: ' + input);
        })(inputs[i + 3], (i + 3) % 20);
      }
    });
  });
});
