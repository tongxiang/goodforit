var mongoose = require('mongoose')
  , should = require('should')
  , User = require('../app/models/user')['User'];

describe('User', function () {
  before(function (done) {
    require('./helper').clearDb(done)
  });

  it('should have a splitWiseToken field', function (done) {
    var user = new User({splitWiseToken: '12345'});
    user.save(function(err, user) {
      user.splitWiseToken.should.equal('12345');
      done(err);
    });
  });
});