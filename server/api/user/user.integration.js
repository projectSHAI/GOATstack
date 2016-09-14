'use strict';

var app = require('../../server.js');
var request = require('supertest');



describe('User API:', function() {

	describe('POST /api/users', function() {

		var users;

	    before(function(done) {
	      request(app)
	        .post('/api/users')
	        .send({
	        	          firstName: 'Chris',
	        	          lastName: 'Haugen',
	        	          email: 'chris24@gmail.com',
	        	          password: 'damn'
	        	        })
	        .expect(200)
	        .expect('Content-Type', /json/)
	        .end(function(err, res) {
	          if (err) {
	            return done(err);
	          }
	          users = res.body;
	          done();
	        });
	    });		

	    it('firstName should equal Chris', function() {
	      expect(users.firstName).to.equal('Chris');
	    });
	    it('lastName should equal Haugen', function() {
	      expect(users.lastName).to.equal('Haugen');
	    });
	    it('email should equal chris24@gmail.com', function() {
	      expect(users.email).to.equal('chris24@gmail.com');
	    });
	    it('password should equal damn', function() {
	      expect(users.password).to.equal('damn');
	    });

	});

});