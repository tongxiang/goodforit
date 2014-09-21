var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var env = process.env.NODE_ENV || 'dev';

if('dev' == env || 'test' == env){
  mongoose.connect(process.env.mongoURL);
} else if('production' == env){
  mongoose.connect(process.env.mongoURL);
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
  venmoHistory: [{}],
  activity: {}, // Cash outflow per unit of time.
  reliability: {}, // However quickly rates have been How quickly debts have been resolved * length of credit history. 
  responsibility: 0, // Decimal of 1. Percentage of debts repaid. 
  connectedness: 0, // The number of parties the user transacts with, added to by each API call.
  transactionHistory: {
    type: Number,
    default: 0
  }
});

var User = mongoose.model('User', userSchema);

exports.User = User;