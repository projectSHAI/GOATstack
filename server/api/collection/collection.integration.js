'use strict';

var app = require('../..');
var request = require('supertest');

var newCollection;

describe('Collection API:', function () {

  describe('GET /api/collections', function () {
    var collections;

    beforeEach(function (done) {
      request(app)
        .get('/api/collections')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          collections = res.body;
          done();
        });
    });

    it('should respond with JSON array', function () {
      expect(collections).to.be.instanceOf(Array);
    });

  });

  // describe('POST /api/collections', function () {
  //   beforeEach(function (done) {
  //     request(app)
  //       .post('/api/collections')
  //       .send({
  //         name: 'New Collection',
  //         order: 1,
  //         gallery: [{
  //           pic_order: 1,
  //           src: 'This is the image src',
  //           msrc: 'This is the image msrc',
  //           w: 500,
  //           h: 500,
  //           caption: 'This is the image caption',
  //           path: '/somepath/imagefile.jpg'
  //         }, {
  //           pic_order: 2,
  //           src: 'This is the image2 src',
  //           msrc: 'This is the image2 msrc',
  //           w: 500,
  //           h: 500,
  //           caption: 'This is the image2 caption',
  //           path: '/somepath/image2file.jpg'
  //         }],
  //         info: 'This is the brand new collection!!!'
  //       })
  //       .expect(201)
  //       .expect('Content-Type', /json/)
  //       .end((err, res) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         newCollection = res.body;
  //         done();
  //       });
  //   });
  //
  //   it('should respond with the newly created collection', function () {
  //     expect(newCollection.name).to.equal('New Collection');
  //     expect(newCollection.order).to.equal(1);
  //     expect(newCollection.info).to.equal('This is the brand new collection!!!');
  //     expect(newCollection.gallery).to.be.instanceOf(Array);
  //
  //     expect(newCollection.gallery[0].pic_order).to.equal(1);
  //     expect(newCollection.gallery[0].src).to.equal('This is the image src');
  //     expect(newCollection.gallery[0].msrc).to.equal('This is the image msrc');
  //     expect(newCollection.gallery[0].w).to.equal(500);
  //     expect(newCollection.gallery[0].h).to.equal(500);
  //     expect(newCollection.gallery[0].caption).to.equal('This is the image caption');
  //     expect(newCollection.gallery[0].path).to.equal('/somepath/imagefile.jpg');
  //
  //     expect(newCollection.gallery[1].pic_order).to.equal(2);
  //     expect(newCollection.gallery[1].src).to.equal('This is the image2 src');
  //     expect(newCollection.gallery[1].msrc).to.equal('This is the image2 msrc');
  //     expect(newCollection.gallery[1].w).to.equal(500);
  //     expect(newCollection.gallery[1].h).to.equal(500);
  //     expect(newCollection.gallery[1].caption).to.equal('This is the image2 caption');
  //     expect(newCollection.gallery[1].path).to.equal('/somepath/image2file.jpg');
  //   });
  //
  // });
  //
  // describe('GET /api/collections/:id', function () {
  //   var collection;
  //
  //   beforeEach(function (done) {
  //     request(app)
  //       .get('/api/collections/' + newCollection._id)
  //       .expect(200)
  //       .expect('Content-Type', /json/)
  //       .end((err, res) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         collection = res.body;
  //         done();
  //       });
  //   });
  //
  //   afterEach(function () {
  //     collection = {};
  //   });
  //
  //   it('should respond with the requested collection', function () {
  //     expect(collection.name).to.equal('New Collection');
  //     expect(collection.order).to.equal(1);
  //     expect(collection.info).to.equal('This is the brand new collection!!!');
  //     expect(collection.gallery).to.be.instanceOf(Array);
  //
  //     expect(collection.gallery[0].pic_order).to.equal(1);
  //     expect(collection.gallery[0].src).to.equal('This is the image src');
  //     expect(collection.gallery[0].msrc).to.equal('This is the image msrc');
  //     expect(collection.gallery[0].w).to.equal(500);
  //     expect(collection.gallery[0].h).to.equal(500);
  //     expect(collection.gallery[0].caption).to.equal('This is the image caption');
  //     expect(collection.gallery[0].path).to.equal('/somepath/imagefile.jpg');
  //
  //     expect(collection.gallery[1].pic_order).to.equal(2);
  //     expect(collection.gallery[1].src).to.equal('This is the image2 src');
  //     expect(collection.gallery[1].msrc).to.equal('This is the image2 msrc');
  //     expect(collection.gallery[1].w).to.equal(500);
  //     expect(collection.gallery[1].h).to.equal(500);
  //     expect(collection.gallery[1].caption).to.equal('This is the image2 caption');
  //     expect(collection.gallery[1].path).to.equal('/somepath/image2file.jpg');
  //   });
  //
  // });
  //
  // describe('PUT /api/collections/:id', function () {
  //   var updatedCollection;
  //   var updatedGallery;
  //
  //   beforeEach(function (done) {
  //     updatedGallery = newCollection.gallery;
  //
  //     updatedGallery[1].src = 'This is the updated image2 src';
  //     updatedGallery[1].msrc = 'This is the updated image2 msrc';
  //     updatedGallery[1].w = 250;
  //     updatedGallery[1].h = 250;
  //     updatedGallery[1].caption = 'This is the updated image2 caption';
  //
  //     request(app)
  //       .put('/api/collections/' + newCollection._id)
  //       .send({
  //         name: 'Updated Collection',
  //         order: 4,
  //         gallery: updatedGallery,
  //         info: 'This is the updated collection!!!'
  //       })
  //       .expect(200)
  //       .expect('Content-Type', /json/)
  //       .end(function (err, res) {
  //         if (err) {
  //           return done(err);
  //         }
  //         updatedCollection = res.body;
  //         done();
  //       });
  //   });
  //
  //   afterEach(function () {
  //     updatedCollection = {};
  //   });
  //
  //   it('should respond with the updated collection', function () {
  //     expect(updatedCollection.name).to.equal('Updated Collection');
  //     expect(updatedCollection.order).to.equal(4);
  //     expect(updatedCollection.info).to.equal('This is the updated collection!!!');
  //     expect(updatedCollection.gallery).to.be.instanceOf(Array);
  //
  //     expect(updatedCollection.gallery[0].pic_order).to.equal(1);
  //     expect(updatedCollection.gallery[0].src).to.equal('This is the image src');
  //     expect(updatedCollection.gallery[0].msrc).to.equal('This is the image msrc');
  //     expect(updatedCollection.gallery[0].w).to.equal(500);
  //     expect(updatedCollection.gallery[0].h).to.equal(500);
  //     expect(updatedCollection.gallery[0].caption).to.equal('This is the image caption');
  //     expect(updatedCollection.gallery[0].path).to.equal('/somepath/imagefile.jpg');
  //
  //     expect(updatedCollection.gallery[1].pic_order).to.equal(2);
  //     expect(updatedCollection.gallery[1].src).to.equal('This is the updated image2 src');
  //     expect(updatedCollection.gallery[1].msrc).to.equal('This is the updated image2 msrc');
  //     expect(updatedCollection.gallery[1].w).to.equal(250);
  //     expect(updatedCollection.gallery[1].h).to.equal(250);
  //     expect(updatedCollection.gallery[1].caption).to.equal('This is the updated image2 caption');
  //     expect(updatedCollection.gallery[1].path).to.equal('/somepath/image2file.jpg');
  //   });
  //
  // });
  //
  // describe('DELETE /api/collections/:id', function () {
  //
  //   it('should respond with 204 on successful removal', function (done) {
  //     request(app)
  //       .delete('/api/collections/' + newCollection._id)
  //       .expect(204)
  //       .end((err, res) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         done();
  //       });
  //   });
  //
  //   it('should respond with 404 when collection does not exist', function (done) {
  //     request(app)
  //       .delete('/api/collections/' + newCollection._id)
  //       .expect(404)
  //       .end((err, res) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         done();
  //       });
  //   });
  //
  // });

});
