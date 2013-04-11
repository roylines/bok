var _ = require('underscore'),
	async = require('async'),
	data = require('./data'),
	names = require('names');

var pupils = {
	data: {},
	ui: {}
};

pupils.data.all = function(req, res) {
	// var all = [];
	// var n = 30;
	// while (n > 0) {
	// 	all.push({
	// 		id: n,
	// 		name: names()
	// 	});
	// 	--n;
	// }
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
	//console.log(req.params.id);
	return res.render('pupil', {
		title: 'Pupil'
	});
};

module.exports = pupils;