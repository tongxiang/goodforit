function home (req, res) {
  res.render('index', {title: 'Express'});
};

module.exports = {
  home: home
}