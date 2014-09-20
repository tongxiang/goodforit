var mongoose = require('mongoose')
  , should = require('should')
  , User = require('../app/models/user')['User'];

describe('User', function () {
  before(function (done) {
    require('./helper').clearDb(done);
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