'use strict';

var app = require('../../server.js');
var request = require('supertest');



describe('User API:', function() {

	////////////////////////////////////////
	//Test 1 for getting list of all users//
	////////////////////////////////////////
	describe('GET /api/users', function() {

		var users;

		it('responds with JSON', function(done) {
			request(app)
				.get('/api/users')
				.expect('Content-Type', /json/)
				.expect(function(res) {
			
					users = res.body;
					expect(res).to.have.status(200)
						.expect(users).to.be.instanceOf(Array)
						.expect(users[0].firstName).to.be.a('string');
				})
				
				done();
				
		});

	});

	////////////////////////////////////////
	//-----Test 2 for creating a user-----//
	////////////////////////////////////////
	describe('POST /api/users', function() {

		var user;

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
	          user = res.body;
	          done();
	        });
	    });		

	    it('firstName should equal Chris', function() {
	      expect(user.firstName).to.equal('Chris');
	    });
	    it('lastName should equal Haugen', function() {
	      expect(user.lastName).to.equal('Haugen');
	    });
	    it('email should equal chris24@gmail.com', function() {
	      expect(user.email).to.equal('chris24@gmail.com');
	    });
	    it('password should equal damn', function() {
	      expect(user.password).to.equal('damn');
	    });

	});

});