function home (req, res) {
  res.render('index', {title: 'Express'});
};

function error (req, res) {
  res.render('error', {title: 'Express'});
};

var User = require('../models/user')['User'];

module.exports = {
  home: home,
  error: error
};