var _ = require('underscore'),
	data = require('./data');

var pupils = {
	data: {},
	ui: {}
};

pupils.data.all = function(req, res) {
	var all = data.pupils;
	res.json(_.sortBy(all, function(pupil) {
		return pupil.name;
	}));
};

pupils.ui.all = function(req, res) {
	return res.render('pupils', {
		title: 'Pupils'
	});
};

pupils.ui.single = function(req, res) {
	return res.render('pupil', {
		title: 'Pupil'
	});
};

module.exports = pupils;