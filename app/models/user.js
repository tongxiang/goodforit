var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/goodforit');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongoose connection is open")
});

var userSchema = new Schema({
  splitWiseToken: String
});

var User = mongoose.model('User', userSchema);

exports.User = User;