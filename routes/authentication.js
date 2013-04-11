
var authentication = {
	data: {},
	ui: {}
};

authentication.ui.login = function(req, res) {
	return res.render('login', {
		title: 'login'
	});
};

authentication.data.login = function(req, res) {
	return res.redirect('/pupils');
};

module.exports = authentication;