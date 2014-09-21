var User = require('../models/user')['User'];
var request = require('request');
var async = require('async');

function getOne (req, res){
  if(req.user){
    getExpenses(req.user, function(err, user){
      res.render('index', { user: user });
    });
  } else{
    res.redirect('/error');
  }
};

function getExpenses (user, cb){
  var splitWiseOptions;
  var venmoOptions;
  var parallelFunctions = [];
  if(user.splitwiseId){
    splitWiseOptions = {
      url: 'https://secure.splitwise.com/api/v3.0/get_expenses',
      oauth: {
        consumer_key: process.env.splitWiseConsumerKey,
        consumer_secret: process.env.splitWiseConsumerSecret,
        token: user.splitWiseProfile.token,
        token_secret: user.splitWiseProfile.tokenSecret
      },
      json: true
    };
    parallelFunctions.push(
      function(callback){
        request(splitWiseOptions, function(err, httpResponse, response){
          callback(null, { splitwise: response.expenses });
        });
      }
    );
  }
  if(user.venmoId){
    venmoOptions = {
      url: 'https://api.venmo.com/v1/payments',
      qs: {
        access_token: user.venmoProfile.accessToken,
        limit: 50
      },
      json: true
    };
    parallelFunctions.push(
      function(callback){
        request(venmoOptions, function(err, httpResponse, response){
          callback(null, { venmo: response.data });
        })
      }
    );
  }

  async.parallel(
    parallelFunctions, 
  function(err, results){
    User.findOne({_id: user.id}, function(err, user){
      results.forEach(function(element){
        if(element.splitwise){
          user.splitWiseHistory = element.splitwise;
        } else if(element.venmo){
          user.venmoHistory = element.venmo;
        }
      });
      user.save(function(err, user){
        cb(err, user);
      });
    });
  });
};

module.exports = {
  getOne: getOne
};