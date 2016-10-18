let express = require('express');
let passport = require('passport');

import {signToken, isAuthenticated} from '../auth.service';
import {me} from '../../api/user/user.controller';

let router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    let error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({ message: 'Something went wrong, please try again.' });
    }

    let token = signToken(user._id, user.role);
    req.headers.token = token;
    req.user = user;
    next();

  })(req, res, next);
}, me);

export {router as localRoutes};
