'use strict';

var proxyquire = require('proxyquire').noPreserveCache();
var sinon = require('sinon');
require('jasmine-sinon');

var wonderCtrlStub = {
  index: 'wonderCtrl.index',
  show: 'wonderCtrl.show',
  create: 'wonderCtrl.create',
  update: 'wonderCtrl.update',
  destroy: 'wonderCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var wonderIndex = proxyquire('./wonder.router.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './wonder.controller': wonderCtrlStub
});

describe('Wonder API Router:', function() {

  it('should return an express router instance', function() {
    expect(wonderIndex).toEqual(routerStub);
  });

  describe('GET /api/wonders', function() {

    it('should route to wonder.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'wonderCtrl.index')
        ).toHaveBeenCalledOnce();
    });

  });

  describe('GET /api/wonders/:id', function() {

    it('should route to wonder.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'wonderCtrl.show')
        ).toHaveBeenCalledOnce();
    });

  });

  describe('POST /api/wonders', function() {

    it('should route to wonder.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'wonderCtrl.create')
        ).toHaveBeenCalledOnce();
    });

  });

  describe('PUT /api/wonders/:id', function() {

    it('should route to wonder.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'wonderCtrl.update')
        ).toHaveBeenCalledOnce();
    });

  });

  describe('PATCH /api/wonders/:id', function() {

    it('should route to wonder.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'wonderCtrl.update')
        ).toHaveBeenCalledOnce();
    });

  });

  describe('DELETE /api/wonders/:id', function() {

    it('should route to wonder.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'wonderCtrl.destroy')
        ).toHaveBeenCalledOnce();
    });

  });

});
