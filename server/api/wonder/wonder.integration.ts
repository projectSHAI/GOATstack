/*jshint loopfunc: true */

import app = require('../../server');
import request = require('supertest');

let addr = app.get('address');

describe('Wonder API:', function() {
  let newWonder;
  let wonders;

  const inputs = [1, 43, 2, 35, 65, 36, 10, 57, 32, 45, 90, 79, 32];

  describe('POST /api/wonders', function() {
    // for (let counter = 0; counter < inputs.length; counter++) {
    //   (function (input) {
    //     return beforeAll((done) => {
    //       request(addr)
    //         .post('/api/wonders')
    //         .send({
    //           name: 'wonder: ' + input
    //         })
    //         .expect(200)
    //         .expect('Content-Type', /json/)
    //         .end((err, res) => {
    //           if (err) {
    //             done.fail(err);
    //           }
    //           expect(res.body.name).toBe('wonder: ' + input);
    //           done();
    //         });
    //     });
    //   })(inputs[counter]);
    // }

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[0]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[0]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[1]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[1]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[2]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[2]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[3]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[3]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[4]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[4]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[5]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[5]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[6]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[6]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[7]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[7]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[8]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[8]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[9]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[9]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[10]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[10]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[11]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[11]);
          done();
        });
    });

    beforeAll((done) => {
      request(addr)
        .post('/api/wonders')
        .send({
          name: 'wonder: ' + inputs[12]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          }
          expect(res.body.name).toBe('wonder: ' + inputs[12]);
          done();
        });
    });

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
      // for (let i = 0; i < 10; i++) {
      //   (function (input, counter) {
      //     return expect(wonders[counter].name).toBe('wonder: ' + input);
      //   })(inputs[i + 3], (i + 3) % 10);
      // }
      expect(wonders[3].name).toBe('wonder: ' + inputs[3]);
      expect(wonders[4].name).toBe('wonder: ' + inputs[4]);
      expect(wonders[5].name).toBe('wonder: ' + inputs[5]);
      expect(wonders[6].name).toBe('wonder: ' + inputs[6]);
      expect(wonders[7].name).toBe('wonder: ' + inputs[7]);
      expect(wonders[8].name).toBe('wonder: ' + inputs[8]);
      expect(wonders[9].name).toBe('wonder: ' + inputs[9]);
      expect(wonders[0].name).toBe('wonder: ' + inputs[10]);
      expect(wonders[1].name).toBe('wonder: ' + inputs[11]);
      expect(wonders[2].name).toBe('wonder: ' + inputs[12]);
    });
  });
});
