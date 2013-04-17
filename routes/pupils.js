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
	return res.render('pupils');
};

pupils.ui.single = function(req, res) {
	data.find(req.params.id, function(e, pupil) {
		if(e) {
			console.error(e);
			return res.send(500);
		}

		return res.render('pupil', {
			pupil: pupil
		});
	});
};

module.exports = pupils;