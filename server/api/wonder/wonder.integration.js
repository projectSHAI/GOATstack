'use strict';

var app = require('../..');
var request = require('supertest');

var newWonder;
var wonders;
describe('Wonder API:', function() {

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
    var wondersArray = ['wondersArray','counter','peanut butter','jelly','ice','creame','anal','beads','Jason','Charles','Thomas','the fourth','likes','cocaine','and','Mikayla','BOOM!','POW!','WHACK','holy','popsicles','batman','seth','rogan','nipples' ];

    beforeEach(function(done) {
      request(app)
        .post('/api/wonders')
        .send({
          name: wondersArray[counter]
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
    for(var i = 0; i<wondersArray.length;i++){
      it('should respond with the newly created wonder', function() {
        expect(wonders[counter].name).to.equal(wondersArray[counter]);
        counter++;
        if(counter > 19){
          counter = 0;
        }
      });
    }

  });

  describe('PUT /api/wonders/:id', function() {
    var updatedWonder;

    before(function(done) {
      request(app)
        .put('/api/wonders/' + newWonder._id)
        .send({
          name: 'Updated Wonder',
          xcoor: 150,
          ycoor: 150
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWonder = res.body;
          done();
        });
    });

    after(function() {
      updatedWonder = {};
    });

    it('should respond with the updated wonder', function() {
      expect(updatedWonder.name).to.equal('Updated Wonder');
      expect(updatedWonder.ycoor).to.equal(150);
      expect(updatedWonder.xcoor).to.equal(150);
    });

  });

});
