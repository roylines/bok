var authentication = require('./authentication'),
	pupils = require('./pupils'),
	device = require('express-device'),
	express = require('express'),
	http = require('http'),
	path = require('path');

var server = {};

var routes = function(app) {
	app.get('/', authentication.ui.login);

	app.get('/login', authentication.ui.login );
	app.post('/login', authentication.data.login );
	app.get('/pupils', pupils.ui.all);
	app.get('/pupil/:id', pupils.ui.single);
	app.get('/data/pupils', pupils.data.all);
};

var listen = function(app) {
	http.createServer(app).listen(app.get('port'), function() {
		console.log('listening on port ' + app.get('port'));
	});
};

server.initialise = function(app) {
	console.log('initialising app');
	// all environments
	console.log(__dirname + '/../views');

	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/../views');
	app.set('view engine', 'ejs');
	app.use(express.static('components'));
	app.use(express.static('public'));
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(device.capture());
	app.use(app.router);

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

	routes(app);
	listen(app);
};

module.exports = server;