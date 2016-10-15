'use strict';

let express = require('express');
let passport = require('passport');
let config = require('../../config/config');
let User = require('../api/user/user.model');

// Passport configuration
require('./local/local.passport').setup(User, config);

let router = express.Router();

router.use('/local', require('./local/local.router'));

export = router;
