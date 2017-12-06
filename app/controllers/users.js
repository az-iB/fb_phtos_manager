var User = require('mongoose').model('User'),
	passport = require('passport');
	FB = require('fb');

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

exports.user = function(req, res, next) {
	res.json(req.user);
};

exports.saveOAuthUserProfile = function(req, profile, next) {
	User.findOne({
			provider: profile.provider,
			providerId: profile.providerId
		},
		function(err, user) {
			if (err) {
				return next(err);
			}
			else {
				if (!user) {
					var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
					User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
						profile.username = availableUsername;
						user = new User(profile);

						user.save(function(err) {
							if (err) {
								var message = _this.getErrorMessage(err);
								req.flash('error', message);
								return res.redirect('/register');
							}

							return next(err, user);
						});
					});
				}
				else {
					return next(err, user);
				}
			}
		}
	);
};

exports.albums = function (req, res, next) {
	var user = req.user;

	if (user) {
		if (user.hasAccess) {
			
			FB.setAccessToken(user.providerData.accessToken);
			FB.api('/me/albums', function(resp) {
			    
			  return next(JSON.stringify(resp));
			});

		}
	}

};

