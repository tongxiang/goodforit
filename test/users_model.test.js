var mongoose = require('mongoose')
  , should = require('should')
  , config = require('../config');

describe('User', function () {
  var User;
  
  before(function (done) {
    config.walk(function(){
      User = require('../app/models/user')['User']
      require('./helper').clearDb(done);
    });
  });

  it('should have a splitWiseId and splitWiseProfile field', function (done) {
    var user = new User({splitWiseId: '12345', splitWiseProfile: {rubbish: 'rubbish'}});
    user.save(function(err, user) {
      user.splitWiseId.should.equal('12345');
      user.splitWiseProfile.should.containDeep({ rubbish: 'rubbish' });
      done(err);
    });
  });
});