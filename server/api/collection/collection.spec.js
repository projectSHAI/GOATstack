'use strict';

var proxyquire = require('proxyquire').noPreserveCache();
var sinon = require('sinon');

var collectionCtrlStub = {
  index: 'collectionCtrl.index',
  show: 'collectionCtrl.show',
  create: 'collectionCtrl.create',
  update: 'collectionCtrl.update',
  destroy: 'collectionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var collectionIndex = proxyquire('../../server.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './collection.controller': collectionCtrlStub
});

describe('Collection API Router:', function() {

  it('should return an express router instance', function() {
    expect(collectionIndex).to.equal(routerStub);
  });

  describe('GET /api/collections', function() {

    it('should route to collection.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'collectionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/collections/:id', function() {

    it('should route to collection.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'collectionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/collections', function() {

    it('should route to collection.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'collectionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/collections/:id', function() {

    it('should route to collection.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'collectionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/collections/:id', function() {

    it('should route to collection.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'collectionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/collections/:id', function() {

    it('should route to collection.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'collectionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
