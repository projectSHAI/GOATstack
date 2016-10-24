let express = require('express');

import {signToken, isAuthenticated} from '../auth.service';
import {me} from '../../api/user/user.controller';
import * as passport from 'passport';

let router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    let error = err || info;
    if (error) {
      console.log(error);
      res.status(401).json(error);
      return null;
    }
    if (!user) {
      res.status(404).json({ message: 'Something went wrong, please try again.' });
      return null;
    }

    let token = signToken(user._id, user.role);
    req.headers.token = token;
    req.user = user;
    next();

  })(req, res, next);
}, me);

export {router as localRoutes};
