'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../../config/config');
var User = require('../api/user/user.model');

// Passport configuration
require('./local/local.passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local/local.router'));

module.exports = router;
