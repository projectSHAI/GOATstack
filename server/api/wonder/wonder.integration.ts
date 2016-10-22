/*jshint loopfunc: true */

import app from '../../server';
import request = require('supertest');

let addr = app.get('address');

describe('Wonder API:', function() {
  let newWonder;
  let wonders;

  const inputs = [1, 43, 2, 35, 65, 36, 10, 57, 32, 45, 90, 79, 32];

  describe('POST /api/wonders', function() {
    for (let counter = 0; counter < inputs.length; counter++) {
      (function (input) {
        return beforeAll((done) => {
          request(addr)
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
              expect(res.body.name).toBe('wonder: ' + input);
              done();
            });
        });
      })(inputs[counter]);
    }

    it('should respond back each query with inputted wonder', () => {
      expect(true).toBe(true);
    });
  });

  describe('GET /api/wonders', function() {
    beforeAll(function(done) {
      request(addr)
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

    it('should respond with JSON array', function() {
      expect(wonders).toEqual(jasmine.any(Array));
    });

    it('wonders should equal the original input array', () => {
      for (let i = 0; i < 10; i++) {
        (function (input, counter) {
          return expect(wonders[counter].name).toBe('wonder: ' + input);
        })(inputs[i + 3], (i + 3) % 10);
      }
    });
  });
});
