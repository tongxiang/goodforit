function walk (cb) {
  var env = process.env.NODE_ENV || 'dev';
  var use;
  if('dev' == env || 'test' == env){
    use = 'local';
    var config = require('./'+use);
    for(var prop in config){
      process.env[prop] = config[prop];
    }
  } else if('production' == env){
    use = 'production';
  }
  if(cb){
    cb();
  }
};

module.exports = {
  walk: walk
};