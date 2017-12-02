var port = 3000;

module.exports = {
	port : port,
	root: require('path').normalize(__dirname + '/..'),
	app: {
		name: 'fb photos manager'
	},
	db: 'mongodb://localhost:27017/fb_photos_manager',
	facebook: {
		  clientID: "1973733189563938"
		, clientSecret: "d830c308fed6cedd8556ed5dbb8ec81a"
		, callbackURL: 'http://127.0.0.1:'+ port +'/oauth/facebook/callback'
		, profileFields: ['emails']
	},
};
