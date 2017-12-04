var User = require('mongoose').model('User'),
	passport = require('passport');

exports.api = function(req, res, next) {
		res.json({ message: 'hooray! welcome to our api!' });
};

exports.renderLogin = function(req, res, next) {
	if (!req.user) {
		res.render('index', {
			title: 'login',
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.renderRegister = function(req, res, next) {
	if (!req.user) {
		res.render('index', {
			title: 'Register',
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.facebookCallback = function(req, res, next){
    passport.authenticate('facebook', { 
        successRedirect: '/',
        failureRedirect: '/login' });
};

exports.isAuthenticated = function (req, res, next) {
  if (!req.user) {
    return res.redirect('/login');
  }

  return next();
};

exports.register = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				console.log('error', err);
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			}

			req.login(user, function(err) {
				if (err)
					return next(err);

				return res.redirect('/');
			});
		});
	}
	else {
		return res.redirect('/');
	}
};