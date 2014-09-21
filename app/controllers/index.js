function landing (req, res) {
  res.render('landing', {title: 'GoodForIt'});
}

function home (req, res) {
  res.render('index', {title: 'Express'});
};

function error (req, res) {
  res.render('error', {title: 'Express'});
};

var User = require('../models/user')['User'];

module.exports = {
  landing: landing,
  home: home,
  error: error
};