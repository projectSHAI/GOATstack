/**
 * GET     /api/user              ->  allUsers
 * POST    /api/user              ->  create
 * GET     /api/user/:id          ->  show
 * PUT     /api/user/:id/password ->  changePassword
 * DELETE  /api/user/:id          ->  destroy
 */

let express = require('express');
import * as auth from '../../auth/auth.service';
import * as UserController from './user.controller';

let router = express.Router();

router.get('/', auth.hasRole('admin'), UserController.index);
router.delete('/:id', auth.hasRole('admin'), UserController.destroy);
router.put('/:id/password', auth.isAuthenticated(), UserController.changePassword);

router.post('/', UserController.create, UserController.me);
router.get('/me', auth.isAuthenticated(), UserController.me);
router.get('/:id', auth.isAuthenticated(), UserController.show);

export {router as userRoutes};
