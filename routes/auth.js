var express = require('express');
var router = express.Router();
var passport = require('passport');
var SplitWiseStrategy = require('../passport-splitwise/lib/index').Strategy;
var VenmoStrategy = require('passport-venmo').Strategy;
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
      'email': profile.email
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      // checks if the user has been already been created, if not
      // we create a new instance of the User model
      if (!user) {
        user = new User({
          splitWiseId: profile.id,
          splitWiseProfile: profile._json,
          email: profile.email
        });
        user.save(function(err) {
          return done(err, user);
        });
      } else {
        user.splitWiseId = profile.id;
        user.email = profile.email;
        user.splitWiseProfile = profile._json;
        user.save(function(err, user) {
          return done(err, user);
        });
      }
    });
  }
));

passport.use(new VenmoStrategy({
    clientID: process.env.venmoClientId,
    clientSecret: process.env.venmoClientSecret,
    callbackURL: process.env.venmoCallbackURL
  },
  function(accessToken, refreshToken, venmo, done) {
    User.findOne({
        'email': venmo.email
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        venmo._json.accessToken = accessToken;
        venmo._json.refreshToken = refreshToken;
        // checks if the user has been already been created, if not
        // we create a new instance of the User model
        if (!user) {
          user = new User({
              venmoId: venmo.id,
              email: venmo.email,
              venmoProfile: venmo._json
          });
          user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
          });
        } else {
          user.venmoId = venmo.id;
          user.email = venmo.email;
          user.venmoProfile = venmo._json;
          user.save(function(err, user){
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
    res.redirect('/home');
  });

router.get('/venmo',
  passport.authenticate('venmo', {
    scope: ['access_profile', 'access_email'],
  }));

router.get('/venmo/callback', 
  passport.authenticate('venmo', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/home');
  }); 

module.exports = router;