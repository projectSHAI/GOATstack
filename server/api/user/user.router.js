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
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.allUsers);
router.post('/', controller.createUser);
router.get('/:id', controller.showUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.destroyUser);

module.exports = router;
