
var users = require('../../app/controllers/users')
	, passport = require('passport');

module.exports = function(app) {
	// test api
	app.route('/api').get(users.api);

	app.route('/login').get(users.renderLogin);

	app.route('/signup').get(users.renderRegister);

	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/login',
		scope:['email','user_photos']
	}));

	app.get('/oauth/facebook/callback', users.facebookCallback);
};
