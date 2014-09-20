var express = require('express');
var router = express.Router();
var User = require('../app/controllers/user');

router.get('/', User.getOne);

module.exports = router;