
var users = require('../../app/controllers/users')
	, passport = require('passport');

module.exports = function(app) {
	// test api
	app.route('/api').get(users.api);

	app.route('/login').get(users.renderLogin).post(passport.authenticate('local', {successRedirect: '/',failureRedirect: '/login'}));

	app.route('/signup').get(users.renderRegister).post(users.register);

	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/login',
		scope:['email','user_photos']
	}));

	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/login',
		successRedirect: '/',
		scope:['email','user_photos']
	}));
	
	app.route('/user').get(users.user);

	app.route('/albums').get(users.albums);

};
