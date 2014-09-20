var User = require('../models/user')['User'];
var request = require('request');

function getOne (req, res){
  if(req.user){
    getExpenses(req.user, function(err, user){
      res.render('report', { user: user });
    });
  } else{
    res.redirect('/error');
  }
};

function getExpenses (user, cb){
  var options = {
    url: 'https://secure.splitwise.com/api/v3.0/get_expenses',
    oauth: {
      consumer_key: process.env.splitWiseConsumerKey,
      consumer_secret: process.env.splitWiseConsumerSecret,
      token: user.splitWiseProfile.token,
      token_secret: user.splitWiseProfile.tokenSecret
    },
    json: true
  }; 
  request(options, function(a, b, c){
    User.findOne({_id: user.id}, function(err, user){
      user.splitWiseHistory = c.expenses;
      user.save(function(err, user){
        cb(err, user);
      });
    });
  });
};

module.exports = {
  getOne: getOne
};