
var users = require('../../app/controllers/users')
	, passport = require('passport');

module.exports = function(app) {
	// test api
	app.route('/api').get(users.api);
};
