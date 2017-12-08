var User = require('mongoose').model('User'),
	passport = require('passport');
	FB = require('fb');


function getAlbums(user, callback ) {
	FB.api('/me/albums',
		{fields: 'id, name, created_time, cover_photo'},
		function(resp) {
			if (callback) {
				let data = resp.data;
			    data.forEach( function (album){
			    	user.albums.push({
			    		'id':album.id,
			    		'name': album.name,
			    		'created_time': album.created_time,
			    		'cover_photo':{
			    			'created_time':album.cover_photo.created_time,
			    			'id': album.cover_photo.id,
			    			'url': 'https://graph.facebook.com/' + album.cover_photo.id + '/picture?access_token=' + user.providerData.accessToken
			    		}


			    	});
				});
				user.synced = true;
				user.save(function (err) {
						if (err) console.log(err);
						else callback(data);
				});
			}
		}
	);
}

function getPhotos(user, albumId, callback ) {
	
	FB.api('/'+albumId+'/photos',
		{fields: 'id, name, created_time'},
		function(resp) {

			let data = resp.data;

			data.forEach( function (photo){
		    	user.photos.push({
		    		'id'	:	photo.id,
		    		'name': photo.name,
		    		'albumId': albumId,
					'created_time'	:	photo.created_time,
					'url'	:	'https://graph.facebook.com/' + photo.id + '/picture?access_token=' + user.providerData.accessToken
		    	});
			});
			user.save(function (err) {
					if (err) console.log(err);
					else callback(true);
			});

			if (callback) {
				callback( albumId, resp );
			}
		}
	);
}


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
	res.json({
		id: req.user._id,
		username: req.user.username,
		avatar:req.user.avatar,
		hasAccess:req.user.hasAccess,
		synced: req.user.synced,
		accessToken: req.user.providerData.accessToken
	});
};

exports.saveOAuthUserProfile = function(req, profile, next) {
	if (!req.user) {
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
							profile.hasAccess = true;
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
	}
};

exports.syncAcount = function (req, res, next) {
	var userExist = req.user;	

	if (userExist) {
		var accessToken	= req.user.providerData.accessToken;
		FB.setAccessToken(accessToken);

		User.findOne({
			_id: userExist._id
		},function(err,user){

			getAlbums(user, function(albums) {
				if (albums) {
					setTimeout(function(){ 
						albums.forEach( function (album){
				    	getPhotos(user, album.id, function( albumId, resp ) {
							if (albumId) {res.end();}
						})
					});
					}, 200);
				}  
			});
		});
	}

};

exports.getAlbums = function (req, res, next) {
	User.findOne({
			_id: req.params.userId
		},{
			albums: 1
		},
		function(err, albums) {
			if (err) {
				return next(err);
			}
			else {
				res.send(albums);
			}
		}
	);
}


exports.getPhotos = function (req, res, next) {

	User.aggregate([
   		{"$match" : 
   			{
   				_id: req.user._id
   			}
   		}, 
	    {"$unwind" : "$photos"}, 
	    {"$match" : {"photos.albumId":req.params.albumId}}, 
	    
	    {"$project" : {_id:0, photos:1}}
	], function (err, result) {
        if (err) {
            rext(err);
        } else {
            res.send(result);
        }
    });

}