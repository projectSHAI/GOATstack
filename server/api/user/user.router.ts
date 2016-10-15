/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/user              ->  allUsers
 * POST    /api/user              ->  createUser
 * GET     /api/user/:id          ->  showUser
 * PUT     /api/user/:id          ->  updateUser
 * DELETE  /api/user/:id          ->  destroyUser
 */

'use strict';

let express = require('express');
let auth = require('../../auth/auth.service');
import * as UserController from './user.controller';

let router = express.Router();

router.get('/', auth.hasRole('admin'), UserController.index);
router.delete('/:id', auth.hasRole('admin'), UserController.destroy);
router.put('/:id/password', auth.isAuthenticated(), UserController.changePassword);

router.post('/', UserController.create, UserController.me);
router.get('/me', auth.isAuthenticated(), UserController.me);
router.get('/:id', auth.isAuthenticated(), UserController.show);

export = router;
