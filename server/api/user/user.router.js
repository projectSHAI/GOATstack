'use strict';

var Router = require('express').Router;
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);

router.get('/me/collection', auth.isAuthenticated(), controller.getCollections);
router.put('/me/collection', auth.isAuthenticated(), controller.addCollection);
router.put('/me/collection/:_id', auth.isAuthenticated(), controller.removeCollection);
router.delete('/me/:collection_id/:_id', auth.isAuthenticated(), controller.removeImage);
router.post('/me/collection/photo', auth.isAuthenticated(), controller.addImage);

router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

// Testing routes
router.delete('/me/:collection_id/:_id/:testing', auth.isAuthenticated(), controller.removeImage);

module.exports = router;
