'use strict';

import proxyquire = require('proxyquire');
let pq = proxyquire.noPreserveCache();
import sinon = require('sinon');

let wonderCtrlStub = {
  index: 'wonderCtrl.index',
  show: 'wonderCtrl.show',
  create: 'wonderCtrl.create',
  update: 'wonderCtrl.update',
  destroy: 'wonderCtrl.destroy'
};

let wonderRouterStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let wonderIndex = pq('./wonder.router.js', {
  'express': {
    Router: function() {
      return wonderRouterStub;
    }
  },
  './wonder.controller': wonderCtrlStub
});

describe('Wonder API Router:', function() {

  it('should return an express router instance', function() {
    expect(wonderIndex).toEqual(wonderRouterStub);
  });

  describe('GET /api/wonders', function() {

    it('should route to wonder.controller.index', function() {
      expect(wonderRouterStub.get.withArgs('/', 'wonderCtrl.index').calledOnce)
        .toBe(true);
    });

  });

  describe('GET /api/wonders/:id', function() {

    it('should route to wonder.controller.show', function() {
      expect(wonderRouterStub.get.withArgs('/:id', 'wonderCtrl.show').calledOnce)
        .toBe(true);
    });

  });

  describe('POST /api/wonders', function() {

    it('should route to wonder.controller.create', function() {
      expect(wonderRouterStub.post.withArgs('/', 'wonderCtrl.create').calledOnce)
        .toBe(true);
    });

  });

  describe('PUT /api/wonders/:id', function() {

    it('should route to wonder.controller.update', function() {
      expect(wonderRouterStub.put.withArgs('/:id', 'wonderCtrl.update').calledOnce)
        .toBe(true);
    });

  });

  describe('PATCH /api/wonders/:id', function() {

    it('should route to wonder.controller.update', function() {
      expect(wonderRouterStub.patch.withArgs('/:id', 'wonderCtrl.update').calledOnce)
        .toBe(true);
    });

  });

  describe('DELETE /api/wonders/:id', function() {

    it('should route to wonder.controller.destroy', function() {
      expect(wonderRouterStub.delete.withArgs('/:id', 'wonderCtrl.destroy').calledOnce)
        .toBe(true);
    });

  });

});
