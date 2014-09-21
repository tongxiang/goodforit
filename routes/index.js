var express = require('express');
var router = express.Router();
var index = require('../app/controllers/index');

/* GET home page */
router.get('/', index.landing);

router.get('/home', index.home);

router.get('/error', index.error);

module.exports = router;