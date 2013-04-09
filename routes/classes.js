var async = require('async'),
	randword = require('randword');

var classes = {};

classes.all = function(req, res) {
	var all = [];

	async.whilst(

	function() {
		return all.length < 100;
	},

	function(callback) {
		randword(function(e, word) {
			all.push({
				name: word
			});
			return callback(e);
		});
	},

	function(err) {
		return res.json(all);
	});
};

module.exports = classes;