var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var env = process.env.NODE_ENV || 'dev';

if('dev' == env || 'test' == env){
  mongoose.connect('mongodb://localhost/goodforit');
} else if('prod' == env){
  // mongoose.connect()
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongoose connection is open")
});

var userSchema = new Schema({
  splitWiseToken: String
});

var User = mongoose.model('User', userSchema);

exports.User = User;