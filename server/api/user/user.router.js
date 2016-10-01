/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/user              ->  allUsers
 * POST    /api/user              ->  createUser
 * GET     /api/user/:id          ->  showUser
 * PUT     /api/user/:id          ->  updateUser
 * DELETE  /api/user/:id          ->  destroyUser
 */

'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

router.get('/me', auth.isAuthenticated(), controller.me);
router.post('/', controller.create);
router.get('/:id', auth.isAuthenticated(), controller.show);

module.exports = router;
