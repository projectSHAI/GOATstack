'use strict';

var express = require('express');
var controller = require('./dropbox.controller');

var router = express.Router();

router.get('/', controller.accountInfo);
router.post('/', controller.upload);
router.get('/auth', controller.authorize);
router.get('/token', controller.token);
router.post('/mkdir', controller.mkdir);
router.post('/delete', controller.del);

module.exports = router;
