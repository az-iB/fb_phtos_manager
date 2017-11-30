var config = require('./config')
	, express = require('express')
	, bodyParser = require('body-parser')
	, morgan = require('morgan')
	, methodOverride = require('method-override')
	, errorhandler = require('errorhandler');

module.exports = function() {
	var app = express();

	app.use(morgan('dev'));

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.set('views', 'app/views');
	app.set('view engine', 'html');
	app.engine('html', require('hbs').__express);

	app.use(methodOverride());

	// development only
	if ('development' == app.get('env')) {
	  app.use(errorhandler({log: errorNotification}))
	}
	function errorNotification(err, str, req) {
	  var title = 'Error in ' + req.method + ' ' + req.url

	  notifier.notify({
	    title: title,
	    message: str
	  })
	}

	app.use(express.static('app/public'));

	return app;
};
