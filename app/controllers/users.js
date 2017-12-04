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
    
    res.json({ message: 'hooray! welcome to our api!' });
    return res.redirect('/login');
  }

  return next();
};