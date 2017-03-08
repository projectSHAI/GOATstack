let express = require('express');

import User from '../api/user/user.model';
import config from '../../../config';
import {localRoutes} from './local/local.router';
import {localSetup} from './local/local.passport';

// Passport configuration
localSetup(User, config);

let router = express.Router();

// Import routes here
// this will setup the passport configuration from the *.passport file
router.use('/local', localRoutes);

// export the es6 way
export {router as authRoutes};
