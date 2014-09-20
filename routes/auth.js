var express = require('express');
var router = express.Router();
var passport = require('passport');
var SplitWiseStrategy = require('../passport-splitwise/lib/index').Strategy;
var User = require('../app/models/user')['User'];

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserialize the user object based on a pre-serialized token
// which is the user id
passport.deserializeUser(function(id, done) {
  User.findOne({
      _id: id
  }, function(err, user) {
      done(err, user);
  });
});

passport.use(new SplitWiseStrategy({
    consumerKey: process.env.splitWiseConsumerKey,
    consumerSecret: process.env.splitWiseConsumerSecret,
    callbackURL: process.env.splitWiseCallbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({
      'splitWiseId': profile.id
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      // checks if the user has been already been created, if not
      // we create a new instance of the User model
      if (!user) {
        user = new User({
          splitWiseId: profile.id,
          splitWiseProfile: profile._json
        });
        user.save(function(err) {
          return done(err, user);
        });
      } else {
        user.splitwiseProfile = profile._json
        user.save(function(err) {
          return done(err, user);
        });
      }
    });
  }
));

router.get('/splitwise',
  passport.authenticate('splitwise'));

router.get('/splitwise/callback', 
  passport.authenticate('splitwise', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user');
  });

module.exports = router;