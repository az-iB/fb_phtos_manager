var User = require('mongoose').model('User'),
	passport = require('passport');

exports.api = function(req, res, next) {
		res.json({ message: 'hooray! welcome to our api!' });
};

exports.facebookCallback = function(req, res, next){
    passport.authenticate('facebook', { 
        successRedirect: '/',
        failureRedirect: '/login' });
};