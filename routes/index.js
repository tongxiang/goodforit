var express = require('express');
var router = express.Router();
var index = require('../app/controllers/index');

/* GET home page */
router.get('/', index.landing);

router.get('/home', index.retrieveUserDataAtHomePage); // Splitwise expense API call made from user data. Can only be made if user authenticated. 

router.get('/error', index.error);

module.exports = router;