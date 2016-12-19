import app from '../../server';
import request = require('supertest');

// let app = init();

// Wonder endpoint Testing
describe('Wonder API:', function() {
  let newWonder;
  let wonders;

  // constant wonder array for testing purposes
  const inputs = [1, 43, 2, 35, 65, 36, 10, 57, 32, 45];

  // Testing the POST api endpoint
  describe('POST /api/wonders', function() {
    // For the sake of conserving space, test using for loops
    for (let counter = 0; counter < inputs.length; counter++) {
      (function (input) {
        // set up beforeAll's for every possible wonder that will be inputed
        // all will execute and POST necessary wonders to test
        return beforeAll((done) => {
          request(app)
            .post('/api/wonders')
            .send({
              name: 'wonder: ' + input
            })
            .expect(200)
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

    // Simple true = true to start the wonder POSTs
    it('should respond back each query with inputted wonder', () => {
      expect(true).toBe(true);
    });
  });

  // This is where the real testing begins
  describe('GET /api/wonders', function() {
    // beforeAll GET all wonders from the DB
    beforeAll(function(done) {
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

    // This response should be an array
    it('should respond with JSON array', function() {
      expect(wonders).toEqual(jasmine.any(Array));
    });

    // Loop through the response array and expect the output to be the same as
    // the POSTs above
    it('wonders should equal the original input array', () => {
      for (let i = 0; i < 10; i++) {
        (function (input, counter) {
          return expect(wonders[counter].name).toBe('wonder: ' + input);
        })(inputs[i], (i) % 10);
      }
    });
  });
});
