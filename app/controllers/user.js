var User = require('../models/user')['User'];

function report (req, res){
  if(req.user){
    res.render('report', { user: req.user });
  } else{
    res.redirect('/error');
  }
};

module.exports = {
  report: report
};