function home (req, res) {
  res.render('index', {title: 'Express'});
};

var User = require('../models/user')['User'];

module.exports = {
  home: home
}