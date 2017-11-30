(function (exports) {
  "use strict";


  function index(req, res) {
    res.render('index', {
        'title': 'Fb photos manager'
        , 'username':(req.user) ?  req.user.username: undefined
        , 'userid':(req.user) ?  req.user._id: undefined
      });
  }
  exports.init = function (app) {
    app.get('/',index)
  };
}(exports));
