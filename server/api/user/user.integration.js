'use strict';

var app = require('../..');
var User = require('./user.model');
var Collection = require('../collection/collection.model');
var Image = require('../image/image.model');
var DropBox = require('../dropbox/dropbox.controller');
var request = require('supertest');

describe('User API:', function () {
  var user;
  var token;
  var collections;
  var storedCollectionOne;
  var storedCollectionTwo;
  var storedCollectionThree;

  // Clear users before testing
  before(function () {
    return User.remove().then(function () {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.save();
    });
  });

  // Clear users after testing
  after(function () {
    return Image.remove()
      .then(Collection.remove()
        .then(DropBox.del(null, null, 'uploads/Users/' + user._id, function (err, obj) {
          User.remove();
        })));
  });

  describe('GET /api/users/me', function () {

    before(function (done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function (done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body._id.toString()).to.equal(user._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function (done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });

  describe('GET /api/users/me/collection', function () {
    beforeEach(function (done) {
      request(app)
        .get('/api/users/me/collection')
        .set('authorization', 'Bearer ' + token)
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

  describe('PUT /api/users/me/collection', function () {
    var currentUser;

    // insert first collection
    before(function (done) {
      request(app)
        .put('/api/users/me/collection')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'My New Collection',
          order: 1,
          info: 'My colleciton info',
          path: 'uploads/Users/' + user._id + '/',
          userId: user._id,
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    // insert second collection
    before(function (done) {
      request(app)
        .put('/api/users/me/collection')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'My New Collection2',
          order: 2,
          info: 'My colleciton2 info',
          path: 'uploads/Users/' + user._id + '/',
          userId: user._id,
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    // insert third collection
    before(function (done) {
      request(app)
        .put('/api/users/me/collection')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'My New Collection3',
          order: 3,
          info: 'My colleciton3 info',
          path: 'uploads/Users/' + user._id + '/',
          userId: user._id,
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          currentUser = res.body.user;
          done();
        });
    });

    before(function (done) {
      request(app)
        .get('/api/users/me/collection')
        .set('authorization', 'Bearer ' + token)
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

    it('should respond with correct 1-to-1 relationship with User document collections id and Collections id', function () {
      /* User Collection
        This will tell us that the User collection collections array id's
        match the Collections Collection id's respectively
      */
      expect(currentUser.collections[0]._id).to.equal(collections[0]._id);
      expect(currentUser.collections[1]._id).to.equal(collections[1]._id);
      expect(currentUser.collections[2]._id).to.equal(collections[2]._id);
    });

    it('should respond with correct collection 1 information', function () {
      /* Collections Colleciton
        This will tell us that the collection collection response information
        matches the information that was sent to the serverside
      */
      expect(collections[0].name).to.equal('My New Collection');
      expect(collections[0].order).to.equal(1);
      expect(collections[0].info).to.equal('My colleciton info');
      expect(collections[0].path).to.equal('uploads/Users/' + user._id + '/');
      expect(collections[0].userId.toString()).to.equal(user._id.toString());
      expect(collections[0].gallery).to.be.instanceOf(Array);
    });

    it('should respond with correct collection 2 information', function () {
      /* Collections Colleciton
        This will tell us that the collection collection response information
        matches the information that was sent to the serverside
      */
      expect(collections[1].name).to.equal('My New Collection2');
      expect(collections[1].order).to.equal(2);
      expect(collections[1].info).to.equal('My colleciton2 info');
      expect(collections[1].path).to.equal('uploads/Users/' + user._id + '/');
      expect(collections[1].userId.toString()).to.equal(user._id.toString());
      expect(collections[1].gallery).to.be.instanceOf(Array);
    });

    it('should respond with correct collection 3 information', function () {
      /* Collections Colleciton
        This will tell us that the collection collection response information
        matches the information that was sent to the serverside
      */
      expect(collections[2].name).to.equal('My New Collection3');
      expect(collections[2].order).to.equal(3);
      expect(collections[2].info).to.equal('My colleciton3 info');
      expect(collections[2].path).to.equal('uploads/Users/' + user._id + '/');
      expect(collections[2].userId.toString()).to.equal(user._id.toString());
      expect(collections[2].gallery).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/users/me/collection/photo', function () {
    var dropboxResponse = [];

    // insert first image into collection 1
    before(function (done) {
      request(app)
        .post('/api/users/me/collection/photo')
        .set('authorization', 'Bearer ' + token)
        .send({
          data: 'This is an awesome collection 1 file',
          imageInfo: {
            pic_order: 1,
            name: 'awesome collection 1 file',
            src: 'awesome collection 1 src',
            msrc: 'awesome collection 1 msrc',
            w: 500,
            h: 500,
            caption: 'awesome collection 1 caption',
            path: '/uploads/Users/' + user._id + '/' + collections[0]._id + '/awesomeCollectionOne.txt',
            collectionId: collections[0]._id
          },
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storedCollectionOne = res.body.collection;
          dropboxResponse.push(res.body.dropbox);
          done();
        });
    });

    // insert first image into collection 2
    before(function (done) {
      request(app)
        .post('/api/users/me/collection/photo')
        .set('authorization', 'Bearer ' + token)
        .send({
          data: 'This is an awesome collection 2 file',
          imageInfo: {
            pic_order: 1,
            name: 'awesome collection 2 file',
            src: 'awesome collection 2 src',
            msrc: 'awesome collection 2 msrc',
            w: 500,
            h: 500,
            caption: 'awesome collection 2 caption',
            path: '/uploads/Users/' + user._id + '/' + collections[1]._id + '/awesomeCollectionTwo.txt',
            collectionId: collections[1]._id
          },
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storedCollectionTwo = res.body.collection;
          dropboxResponse.push(res.body.dropbox);
          done();
        });
    });

    // insert first image into collection 3
    before(function (done) {
      request(app)
        .post('/api/users/me/collection/photo')
        .set('authorization', 'Bearer ' + token)
        .send({
          data: 'This is an awesome collection 3 file',
          imageInfo: {
            pic_order: 1,
            name: 'awesome collection 3 file',
            src: 'awesome collection 3 src',
            msrc: 'awesome collection 3 msrc',
            w: 500,
            h: 500,
            caption: 'awesome collection 3 caption',
            path: '/uploads/Users/' + user._id + '/' + collections[2]._id + '/awesomeCollectionThree.txt',
            collectionId: collections[2]._id
          },
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storedCollectionThree = res.body.collection;
          dropboxResponse.push(res.body.dropbox);
          done();
        });
    });

    // insert second image into collection 1
    before(function (done) {
      request(app)
        .post('/api/users/me/collection/photo')
        .set('authorization', 'Bearer ' + token)
        .send({
          data: 'This is an awesome collection 1 file 2',
          imageInfo: {
            pic_order: 2,
            name: 'awesome collection 1 file 2',
            src: 'awesome collection 1 src 2',
            msrc: 'awesome collection 1 msrc 2',
            w: 500,
            h: 500,
            caption: 'awesome collection 1 caption 2',
            path: '/uploads/Users/' + user._id + '/' + collections[0]._id + '/awesomeCollectionOne2.txt',
            collectionId: collections[0]._id
          },
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storedCollectionOne = res.body.collection;
          dropboxResponse.push(res.body.dropbox);
          done();
        });
    });

    // insert second image into collection 2
    before(function (done) {
      request(app)
        .post('/api/users/me/collection/photo')
        .set('authorization', 'Bearer ' + token)
        .send({
          data: 'This is an awesome collection 2 file 2',
          imageInfo: {
            pic_order: 2,
            name: 'awesome collection 2 file 2',
            src: 'awesome collection 2 src 2',
            msrc: 'awesome collection 2 msrc 2',
            w: 500,
            h: 500,
            caption: 'awesome collection 2 caption 2',
            path: '/uploads/Users/' + user._id + '/' + collections[1]._id + '/awesomeCollectionTwo2.txt',
            collectionId: collections[1]._id
          },
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storedCollectionTwo = res.body.collection;
          dropboxResponse.push(res.body.dropbox);
          done();
        });
    });

    // insert second image into collection 3
    before(function (done) {
      request(app)
        .post('/api/users/me/collection/photo')
        .set('authorization', 'Bearer ' + token)
        .send({
          data: 'This is an awesome collection 3 file 2',
          imageInfo: {
            pic_order: 2,
            name: 'awesome collection 3 file 2',
            src: 'awesome collection 3 src 2',
            msrc: 'awesome collection 3 msrc 2',
            w: 500,
            h: 500,
            caption: 'awesome collection 3 caption 2',
            path: '/uploads/Users/' + user._id + '/' + collections[2]._id + '/awesomeCollectionThree2.txt',
            collectionId: collections[2]._id
          },
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storedCollectionThree = res.body.collection;
          dropboxResponse.push(res.body.dropbox);
          done();
        });
    });

    // insert third image into collection 1
    before(function (done) {
      request(app)
        .post('/api/users/me/collection/photo')
        .set('authorization', 'Bearer ' + token)
        .send({
          data: 'This is an awesome collection 1 file 3',
          imageInfo: {
            pic_order: 3,
            name: 'awesome collection 1 file 3',
            src: 'awesome collection 1 src 3',
            msrc: 'awesome collection 1 msrc 3',
            w: 500,
            h: 500,
            caption: 'awesome collection 1 caption 3',
            path: '/uploads/Users/' + user._id + '/' + collections[0]._id + '/awesomeCollectionOne3.txt',
            collectionId: collections[0]._id
          },
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storedCollectionOne = res.body.collection;
          dropboxResponse.push(res.body.dropbox);
          done();
        });
    });


    // insert fouth image into collection 1
    before(function (done) {
      request(app)
        .post('/api/users/me/collection/photo')
        .set('authorization', 'Bearer ' + token)
        .send({
          data: 'This is an awesome collection 1 file 4',
          imageInfo: {
            pic_order: 4,
            name: 'awesome collection 1 file 4',
            src: 'awesome collection 1 src 4',
            msrc: 'awesome collection 1 msrc 4',
            w: 500,
            h: 500,
            caption: 'awesome collection 1 caption 4',
            path: '/uploads/Users/' + user._id + '/' + collections[0]._id + '/awesomeCollectionOne4.txt',
            collectionId: collections[0]._id
          },
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storedCollectionOne = res.body.collection;
          dropboxResponse.push(res.body.dropbox);
          done();
        });
    });

    // insert fifth image into collection 1
    before(function (done) {
      request(app)
        .post('/api/users/me/collection/photo')
        .set('authorization', 'Bearer ' + token)
        .send({
          data: 'This is an awesome collection 1 file 5',
          imageInfo: {
            pic_order: 5,
            name: 'awesome collection 1 file 5',
            src: 'awesome collection 1 src 5',
            msrc: 'awesome collection 1 msrc 5',
            w: 500,
            h: 500,
            caption: 'awesome collection 1 caption 5',
            path: '/uploads/Users/' + user._id + '/' + collections[0]._id + '/awesomeCollectionOne5.txt',
            collectionId: collections[0]._id
          },
          testing: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storedCollectionOne = res.body.collection;
          dropboxResponse.push(res.body.dropbox);
          done();
        });
    });

    // After insertions use getCollections api to get all colleciton data
    before(function (done) {
      request(app)
        .get('/api/users/me/collection')
        .set('authorization', 'Bearer ' + token)
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

    it('should respond with 1-to-1 relationship with Collection collection gallery id with Image collection ids', function () {
      /* Collection Collection
        This will tell us is the gallery id in the collection collection is the
        same as the id in the image collection response
      */
      expect(storedCollectionOne.gallery[0]._id).to.equal(collections[0].gallery[0]._id);
      expect(storedCollectionOne.gallery[1]._id).to.equal(collections[0].gallery[1]._id);
      expect(storedCollectionTwo.gallery[0]._id).to.equal(collections[1].gallery[0]._id);
      expect(storedCollectionTwo.gallery[1]._id).to.equal(collections[1].gallery[1]._id);
      expect(storedCollectionThree.gallery[0]._id).to.equal(collections[2].gallery[0]._id);
      expect(storedCollectionThree.gallery[1]._id).to.equal(collections[2].gallery[1]._id);
    });

    it('should respond back with Collection 1 image 1 information', function () {
      /* Image Collection
        This will tell us if the image collection response information matches
        that of the information that we send to the serverside controller
      */
      expect(collections[0].gallery[0].name).to.equal('awesome collection 1 file');
      expect(collections[0].gallery[0].pic_order).to.equal(1);
      expect(collections[0].gallery[0].src).to.equal('awesome collection 1 src');
      expect(collections[0].gallery[0].msrc).to.equal('awesome collection 1 msrc');
      expect(collections[0].gallery[0].w).to.equal(500);
      expect(collections[0].gallery[0].h).to.equal(500);
      expect(collections[0].gallery[0].caption).to.equal('awesome collection 1 caption');
      expect(collections[0].gallery[0].path).to.equal('/uploads/Users/' + user._id + '/' + collections[0]._id + '/awesomeCollectionOne.txt');
      expect(collections[0].gallery[0].collectionId).to.equal(collections[0]._id);
    });

    it('should respond back with Collection 1 image 1 dropbox response', function () {
      /* Dropbox upload
        This will tell us if the Dropbox upload response information matches that
        of the file we just uploaded and if the file exists in  the applicaiton's
        dropbox
      */
      expect(dropboxResponse[0].path).to.equal('/uploads/Users/' + user._id + '/' + collections[0]._id + '/awesomeCollectionOne.txt');
      expect(dropboxResponse[0].is_dir).to.equal(false);
      expect(dropboxResponse[0].root).to.equal('app_folder');
    });

    it('should respond back with Collection 2 image 1 information', function () {
      /* Image Collection
        This will tell us if the image collection response information matches
        that of the information that we send to the serverside controller
      */
      expect(collections[1].gallery[0].name).to.equal('awesome collection 2 file');
      expect(collections[1].gallery[0].pic_order).to.equal(1);
      expect(collections[1].gallery[0].src).to.equal('awesome collection 2 src');
      expect(collections[1].gallery[0].msrc).to.equal('awesome collection 2 msrc');
      expect(collections[1].gallery[0].w).to.equal(500);
      expect(collections[1].gallery[0].h).to.equal(500);
      expect(collections[1].gallery[0].caption).to.equal('awesome collection 2 caption');
      expect(collections[1].gallery[0].path).to.equal('/uploads/Users/' + user._id + '/' + collections[1]._id + '/awesomeCollectionTwo.txt');
      expect(collections[1].gallery[0].collectionId).to.equal(collections[1]._id);
    });

    it('should respond back with Collection 2 image 1 dropbox response', function () {
      /* Dropbox upload
        This will tell us if the Dropbox upload response information matches that
        of the file we just uploaded and if the file exists in  the applicaiton's
        dropbox
      */
      expect(dropboxResponse[1].path).to.equal('/uploads/Users/' + user._id + '/' + collections[1]._id + '/awesomeCollectionTwo.txt');
      expect(dropboxResponse[1].is_dir).to.equal(false);
      expect(dropboxResponse[1].root).to.equal('app_folder');
    });

    it('should respond back with Collection 3 image 1 information', function () {
      /* Image Collection
        This will tell us if the image collection response information matches
        that of the information that we send to the serverside controller
      */
      expect(collections[2].gallery[0].name).to.equal('awesome collection 3 file');
      expect(collections[2].gallery[0].pic_order).to.equal(1);
      expect(collections[2].gallery[0].src).to.equal('awesome collection 3 src');
      expect(collections[2].gallery[0].msrc).to.equal('awesome collection 3 msrc');
      expect(collections[2].gallery[0].w).to.equal(500);
      expect(collections[2].gallery[0].h).to.equal(500);
      expect(collections[2].gallery[0].caption).to.equal('awesome collection 3 caption');
      expect(collections[2].gallery[0].path).to.equal('/uploads/Users/' + user._id + '/' + collections[2]._id + '/awesomeCollectionThree.txt');
      expect(collections[2].gallery[0].collectionId).to.equal(collections[2]._id);
    });

    it('should respond back with Collection 3 image 1 dropbox response', function () {
      /* Dropbox upload
        This will tell us if the Dropbox upload response information matches that
        of the file we just uploaded and if the file exists in  the applicaiton's
        dropbox
      */
      expect(dropboxResponse[2].path).to.equal('/uploads/Users/' + user._id + '/' + collections[2]._id + '/awesomeCollectionThree.txt');
      expect(dropboxResponse[2].is_dir).to.equal(false);
      expect(dropboxResponse[2].root).to.equal('app_folder');
    });

    it('should respond back with Collection 1 image 2 information', function () {
      /* Image Collection
        This will tell us if the image collection response information matches
        that of the information that we send to the serverside controller
      */
      expect(collections[0].gallery[1].name).to.equal('awesome collection 1 file 2');
      expect(collections[0].gallery[1].pic_order).to.equal(2);
      expect(collections[0].gallery[1].src).to.equal('awesome collection 1 src 2');
      expect(collections[0].gallery[1].msrc).to.equal('awesome collection 1 msrc 2');
      expect(collections[0].gallery[1].w).to.equal(500);
      expect(collections[0].gallery[1].h).to.equal(500);
      expect(collections[0].gallery[1].caption).to.equal('awesome collection 1 caption 2');
      expect(collections[0].gallery[1].path).to.equal('/uploads/Users/' + user._id + '/' + collections[0]._id + '/awesomeCollectionOne2.txt');
      expect(collections[0].gallery[1].collectionId).to.equal(collections[0]._id);
    });

    it('should respond back with Collection 1 image 2 dropbox response', function () {
      /* Dropbox upload
        This will tell us if the Dropbox upload response information matches that
        of the file we just uploaded and if the file exists in  the applicaiton's
        dropbox
      */
      expect(dropboxResponse[3].path).to.equal('/uploads/Users/' + user._id + '/' + collections[0]._id + '/awesomeCollectionOne2.txt');
      expect(dropboxResponse[3].is_dir).to.equal(false);
      expect(dropboxResponse[3].root).to.equal('app_folder');
    });

    it('should respond back with Collection 2 image 2 information', function () {
      /* Image Collection
        This will tell us if the image collection response information matches
        that of the information that we send to the serverside controller
      */
      expect(collections[1].gallery[1].name).to.equal('awesome collection 2 file 2');
      expect(collections[1].gallery[1].pic_order).to.equal(2);
      expect(collections[1].gallery[1].src).to.equal('awesome collection 2 src 2');
      expect(collections[1].gallery[1].msrc).to.equal('awesome collection 2 msrc 2');
      expect(collections[1].gallery[1].w).to.equal(500);
      expect(collections[1].gallery[1].h).to.equal(500);
      expect(collections[1].gallery[1].caption).to.equal('awesome collection 2 caption 2');
      expect(collections[1].gallery[1].path).to.equal('/uploads/Users/' + user._id + '/' + collections[1]._id + '/awesomeCollectionTwo2.txt');
      expect(collections[1].gallery[1].collectionId).to.equal(collections[1]._id);
    });

    it('should respond back with Collection 2 image 2 dropbox response', function () {
      /* Dropbox upload
        This will tell us if the Dropbox upload response information matches that
        of the file we just uploaded and if the file exists in  the applicaiton's
        dropbox
      */
      expect(dropboxResponse[4].path).to.equal('/uploads/Users/' + user._id + '/' + collections[1]._id + '/awesomeCollectionTwo2.txt');
      expect(dropboxResponse[4].is_dir).to.equal(false);
      expect(dropboxResponse[4].root).to.equal('app_folder');
    });

    it('should respond back with Collection 3 image 2 information', function () {
      /* Image Collection
        This will tell us if the image collection response information matches
        that of the information that we send to the serverside controller
      */
      expect(collections[2].gallery[1].name).to.equal('awesome collection 3 file 2');
      expect(collections[2].gallery[1].pic_order).to.equal(2);
      expect(collections[2].gallery[1].src).to.equal('awesome collection 3 src 2');
      expect(collections[2].gallery[1].msrc).to.equal('awesome collection 3 msrc 2');
      expect(collections[2].gallery[1].w).to.equal(500);
      expect(collections[2].gallery[1].h).to.equal(500);
      expect(collections[2].gallery[1].caption).to.equal('awesome collection 3 caption 2');
      expect(collections[2].gallery[1].path).to.equal('/uploads/Users/' + user._id + '/' + collections[2]._id + '/awesomeCollectionThree2.txt');
      expect(collections[2].gallery[1].collectionId).to.equal(collections[2]._id);
    });

    it('should respond back with Collection 3 image 2 dropbox response', function () {
      /* Dropbox upload
        This will tell us if the Dropbox upload response information matches that
        of the file we just uploaded and if the file exists in  the applicaiton's
        dropbox
      */
      expect(dropboxResponse[5].path).to.equal('/uploads/Users/' + user._id + '/' + collections[2]._id + '/awesomeCollectionThree2.txt');
      expect(dropboxResponse[5].is_dir).to.equal(false);
      expect(dropboxResponse[5].root).to.equal('app_folder');
    });
  });

  describe('DELETE /api/users/me/:collection_id/:_id', function () {
    var dropboxResponse = [];
    var collectionOneImage;
    var collectionTwoImage;

    describe('200 and 404 status codes', function () {
      after(function (done) {
        request(app)
          .get('/api/users/me/collection')
          .set('authorization', 'Bearer ' + token)
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

      // Removal of Colleciton 1 image 1
      it('should respond with 200 on successful removal of Collection 1 image 1', function (done) {
        request(app)
          .delete('/api/users/me/' + collections[0]._id + '/' + collections[0].gallery[0]._id + '/true')
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            dropboxResponse.push(res.body.dropbox);
            storedCollectionOne = res.body.collection;
            collectionOneImage = res.body.image;
            done();
          });
      });

      it('should respond with 404 not found on Collection 1 image 1', function (done) {
        request(app)
          .delete('/api/users/me/' + collections[0]._id + '/' + collections[0].gallery[0]._id + '/true')
          .set('authorization', 'Bearer ' + token)
          .expect(404)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            done();
          });
      });

      // Removal of Collection 2 image 1
      it('should respond with 200 on successful removal of Collection 2 image 1', function (done) {
        request(app)
          .delete('/api/users/me/' + collections[1]._id + '/' + collections[1].gallery[0]._id + '/true')
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            dropboxResponse.push(res.body.dropbox);
            storedCollectionTwo = res.body.collection;
            collectionTwoImage = res.body.image;
            done();
          });
      });

      it('should respond with 404 not found on Collection 2 image 1', function (done) {
        request(app)
          .delete('/api/users/me/' + collections[1]._id + '/' + collections[1].gallery[0]._id + '/true')
          .set('authorization', 'Bearer ' + token)
          .expect(404)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            done();
          });
      });
    });

    describe('check new collections information', function () {
      it('should respond with 1-to-1 relationship with Collection collection gallery id with Image collection ids', function () {
        /* Collection Collection
          This will tell us is the gallery id in the collection collection is the
          same as the id in the image collection response
        */
        expect(storedCollectionOne.gallery[0]._id).to.equal(collections[0].gallery[0]._id);
        expect(storedCollectionTwo.gallery[0]._id).to.equal(collections[1].gallery[0]._id);
      });

      it('should respond with correct image information in the getCollections response', function () {
        expect(collections[0].gallery).to.be.instanceOf(Array);
        expect(collections[1].gallery).to.be.instanceOf(Array);

        expect(collections[0].gallery[0]._id).to.not.equal(collectionOneImage._id);
        expect(collections[1].gallery[0]._id).to.not.equal(collectionTwoImage._id);

        expect(collections[0].gallery[0].pic_order).to.equal(1);
        expect(collections[0].gallery[1].pic_order).to.equal(2);
        expect(collections[0].gallery[2].pic_order).to.equal(3);
        expect(collections[0].gallery[3].pic_order).to.equal(4);
      });

      it('should respond with dropbox deletion information', function () {
        expect(dropboxResponse[0].path).to.equal(collectionOneImage.path);
        expect(dropboxResponse[0].is_deleted).to.equal(true);

        expect(dropboxResponse[1].path).to.equal(collectionTwoImage.path);
        expect(dropboxResponse[1].is_deleted).to.equal(true);
      });
    });
  });
});
