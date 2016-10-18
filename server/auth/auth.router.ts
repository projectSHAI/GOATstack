let express = require('express');
let passport = require('passport');

import {config} from '../../config/config';
import User from '../api/user/user.model';
import {localRoutes} from './local/local.router';
import {localSetup} from './local/local.passport';

// Passport configuration
localSetup(User, config());

let router = express.Router();

router.use('/local', localRoutes);

export {router as authRoutes};
