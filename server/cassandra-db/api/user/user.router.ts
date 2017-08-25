/**
 * GET     /api/user              ->  allUsers
 * POST    /api/user              ->  create
 * GET     /api/user/:email          ->  show
 * PUT     /api/user/:email/password ->  changePassword
 * DELETE  /api/user/:email          ->  destroy
 */

let express = require('express');
import * as auth from '../../auth/auth.service';
import * as UserController from './user.controller';

let router = express.Router();

router.get('/', auth.hasRole('admin'), UserController.index);
router.put('/:email/password', auth.isAuthenticated(), UserController.changePassword);

router.post('/', UserController.create, UserController.me);
router.get('/me', auth.isAuthenticated(), UserController.me);
router.get('/:email', auth.isAuthenticated(), UserController.show);

export {router as userRoutes};
