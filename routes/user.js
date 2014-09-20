var express = require('express');
var router = express.Router();
var passport = require('passport');
var SplitWiseStrategy = require('../passport-splitwise/lib/index').Strategy;
var user = require('../app/controllers/user');


passport.use(new SplitWiseStrategy({
    consumerKey: 'nTyvgCWEldGTB6dn4g4Fji33OF6yLs2pR9UqdIJD',
    consumerSecret: 'mHl2vGrFxhavUatBxM0EZUNDe4XX37NVrj3PuOBv',
    callbackURL: 'http://127.0.0.1:3000/auth/splitwise/callback'
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

router.get('/splitwise',
  passport.authenticate('splitwise'));

router.get('/splitwise/callback', 
  passport.authenticate('splitwise', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;