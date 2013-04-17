var authentication = require('./authentication'),
	passport = require('passport'),
	pupils = require('./pupils'),
	device = require('express-device'),
	express = require('express'),
	http = require('http'),
	path = require('path');

var server = {};

var routes = function(app) {
	app.get('/', authentication.ensure, pupils.ui.all);

	app.get('/pupils', authentication.ensure, pupils.ui.all);
	app.get('/pupil/:id', authentication.ensure, pupils.ui.single);
	app.get('/data/pupils', authentication.ensure, pupils.data.all);

	app.get('/login', authentication.ui.login);
	app.post('/login', authentication.data.login);
	app.get('/logout', authentication.ui.logout);

	app.get('/auth/google', authentication.google.authenticate, authentication.google.fail);
	app.get('/auth/google/return', authentication.google.authenticate, authentication.google.fail);
};

var listen = function(app) {
	http.createServer(app).listen(app.get('port'), function() {
		console.log('listening on port ' + app.get('port'));
	});
};

server.initialise = function(app) {
	console.log('initialising app');
	authentication.google.initialise();

	console.log(__dirname + '/../views');

	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/../views');
	app.set('view engine', 'ejs');
	app.use(express.static('components'));
	app.use(express.static('public'));
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: process.env.SESSIONSECRET || 'alakazamseemeflymymagiccarpetthroughthesky'
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(device.capture());

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

	routes(app);
	listen(app);
};

module.exports = server;