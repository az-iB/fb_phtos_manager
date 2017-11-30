process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var config = require('./config/config'),
	express = require('./config/express');

var app = express();

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at 127.0.0.1:' + config.port);
