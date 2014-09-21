var User = require('../models/user')['User'];
var request = require('request');

function retrieveUserDataAtHomePage (req, res){
  if(req.user){
    getExpenses(req.user, function(err, user){
      res.render('index', { user: user });
      console.log('**USER**', user)
    });
  } else {
    res.redirect('/error');
  }
};

// Pings the Splitwise get_expense API to retrieve transactions information about the user currently logged in.  
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

function landing (req, res) {
  res.render('landing', {title: 'GoodForIt'});
}

function error (req, res) {
  res.render('error', {title: 'GoodForIt'});
};

module.exports = {
  landing: landing,
  retrieveUserDataAtHomePage: retrieveUserDataAtHomePage,
  error: error,
};