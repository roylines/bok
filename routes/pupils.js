var async = require('async'),
	names = require('names');

var pupils = {};

pupils.all = function(req, res) {
	var all = [];
	var n = 30;
	while(n > 0) {
		all.push(names());
		--n;
	}

	res.json(all);
};

module.exports = pupils;