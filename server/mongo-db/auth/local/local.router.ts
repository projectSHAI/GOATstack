let express = require('express');

import {signToken, isAuthenticated} from '../auth.service';
import {me} from '../../api/user/user.controller';
import * as passport from 'passport';

let router = express.Router();

// Only one route is necessary
// When local authentication is required the 'local' hook is known from setup
// in .passport.ts file
router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    let error = err || info;
    if (error) {
      res.status(401).json(error);
      return null;
    }
    if (!user) {
      res.status(404).json({ message: 'Something went wrong, please try again' });
      return null;
    }

    let token = signToken(user._id, user.role);
    req.headers.token = token;
    req.user = user;
    next();

  })(req, res, next);
}, me);

export {router as localRoutes};
