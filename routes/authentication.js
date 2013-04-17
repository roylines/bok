var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

var authentication = {
	data: {},
	google: {},
	ui: {}
};

authentication.ui.login = function(req, res) {
	return res.render('login', {
		title: 'login'
	});
};

authentication.ui.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

authentication.data.login = function(req, res) {
	return res.redirect('/pupils');
};

authentication.google.initialise = function() {
	passport.serializeUser(function(user, done) {
		console.log('serializeUser: ' + JSON.stringify(user));
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		console.log('deserializeUser' + JSON.stringify(obj));
		done(null, obj);
	});

	var domain = process.env.LOCALDOMAIN || 'http://localhost:3000';

	passport.use(new GoogleStrategy({
		returnURL: domain + '/auth/google/return',
		realm: domain + '/'
	},

	function(identifier, profile, done) {
		console.log('google strategy');
		profile.identifier = identifier;
		return done(null, profile);
	}));
};

authentication.google.authenticate = function(req, res, next) {
	return passport.authenticate('google', {
		failureRedirect: '/login'
	})(req, res, next);
};

authentication.google.fail = function(req, res) {
	res.redirect('/');
};

authentication.ensure = function(req, res, next) {
	console.log('ensureAuthenticated');
	if (req.isAuthenticated()) {
		res.locals.user = req.session.passport.user;
		return next();
	}
	res.redirect('/login');
};

module.exports = authentication;