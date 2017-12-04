(function (exports) {
  "use strict";


  function index(req, res) {
    if (!req.user) {
      res.redirect('/login');
    }
    res.render('index', {
      'title': 'Fb photos manager'
      , 'username':(req.user) 
      , 'userid':(req.user)
    });
  }
  exports.init = function (app) {
    app.get('/',index)
  };
}(exports));
