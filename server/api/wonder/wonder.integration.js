'use strict';

var app = require('../../server.js');
var request = require('supertest');

describe('Wonder API:', function() {
  var newWonder;
  var wonders;

  describe('GET /api/wonders', function() {
    before(function(done) {
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

    it('should respond with JSON array', function() {
      expect(wonders).to.be.instanceOf(Array);
    });

  });
  describe('POST /api/wonders', function() {

    var counter = 0;

    beforeEach(function(done) {
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

    beforeEach(function(done){
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

    for(var i = 0; i < 23; i++){
      it('should respond with the newly created wonder:' + i % 8 + ' at index:' + i % 20, function() {
        expect(wonders[counter].name).to.equal('wonder: ' + counter % 8);
        counter = (counter + 1) % 20;
      });
    }

  });
});
