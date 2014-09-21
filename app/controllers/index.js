var User = require('../models/user')['User'];
var request = require('request');

function landing (req, res) {
  res.render('landing', {title: 'GoodForIt'});
}

function error (req, res) {
  res.render('error', {title: 'GoodForIt'});
};

module.exports = {
  landing: landing,
  error: error
};