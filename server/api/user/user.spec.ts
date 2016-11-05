import proxyquire = require('proxyquire');
let pq = proxyquire.noPreserveCache();
import sinon = require('sinon');

// userCtrlStub is used to mimic the router
let userCtrlStub = {
  index: 'userCtrl.index',
  destroy: 'userCtrl.destroy',
  me: 'userCtrl.me',
  changePassword: 'userCtrl.changePassword',
  show: 'userCtrl.show',
  create: 'userCtrl.create'
};

// mimic teh auth service
let authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

// routerStub spys on http RESTFUL requests
let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
// proxyquire simulates the request
// initialize proxyquire
let userIndex = pq('./user.router.js', {
  'express': {
    Router() {
      return routerStub;
    }
  },
  './user.controller': userCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('User API Router:', function() {

  // expects the prozyquire routes to equal the routes it was assigned to
  it('should return an express router instance', function() {
    expect(userIndex.userRoutes).toEqual(routerStub);
  });

  describe('GET /api/users', function() {

    // expect with each request the approapriate endpoint was called
    it('should verify admin role and route to user.controller.index', function() {
      expect(routerStub.get.withArgs('/', 'authService.hasRole.admin', 'userCtrl.index').calledOnce)
        .toBe(true);
    });

  });

  describe('DELETE /api/users/:id', function() {

    it('should verify admin role and route to user.controller.destroy', function() {
      expect(routerStub.delete.withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy').calledOnce)
        .toBe(true);
    });

  });

  describe('GET /api/users/me', function() {

    it('should be authenticated and route to user.controller.me', function() {
      expect(routerStub.get.withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me').calledOnce)
        .toBe(true);
    });

  });

  describe('PUT /api/users/:id/password', function() {

    it('should be authenticated and route to user.controller.changePassword', function() {
      expect(routerStub.put.withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword').calledOnce)
        .toBe(true);
    });

  });

  describe('GET /api/users/:id', function() {

    it('should be authenticated and route to user.controller.show', function() {
      expect(routerStub.get.withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show').calledOnce)
        .toBe(true);
    });

  });

  describe('POST /api/users', function() {

    it('should route to user.controller.create', function() {
      expect(routerStub.post.withArgs('/', 'userCtrl.create').calledOnce)
        .toBe(true);
    });

  });

});
