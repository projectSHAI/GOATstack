'use strict';

var proxyquire = require('proxyquire').noPreserveCache();
var sinon = require('sinon');

var imageCtrlStub = {
  index: 'imageCtrl.index',
  show: 'imageCtrl.show',
  create: 'imageCtrl.create',
  update: 'imageCtrl.update',
  destroy: 'imageCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var imageIndex = proxyquire('../../server.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './image.controller': imageCtrlStub
});

describe('Image API Router:', function() {

  it('should return an express router instance', function() {
    expect(imageIndex).to.equal(routerStub);
  });

  describe('GET /api/images', function() {

    it('should route to image.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'imageCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/images/:id', function() {

    it('should route to image.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'imageCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/images', function() {

    it('should route to image.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'imageCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/images/:id', function() {

    it('should route to image.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'imageCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/images/:id', function() {

    it('should route to image.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'imageCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/images/:id', function() {

    it('should route to image.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'imageCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
