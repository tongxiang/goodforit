var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var env = process.env.NODE_ENV || 'dev';

if('dev' == env || 'test' == env){
  mongoose.connect(process.env.mongoURL);
} else if('prod' == env){
  // mongoose.connect()
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongoose connection is open")
});

var userSchema = new Schema({
  email: String,
  splitWiseId: String,
  splitWiseProfile: {},
  splitWiseHistory: [{}],
  venmoId: String,
  venmoProfile: {},
  venmoHistory: [{}]
});

var User = mongoose.model('User', userSchema);

exports.User = User;