var port = 3000;

module.exports = {
	port : port,
	root: require('path').normalize(__dirname + '/..'),
	app: {
		name: 'fb photos manager'
	},
	db: 'mongodb://localhost:27017/fb_photos_manager'
};
