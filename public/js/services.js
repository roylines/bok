angular.module('bokServices', ['ngResource']).
factory('Pupil', function($resource) {
	return $resource('pupils', {}, {
		query: {
			method: 'GET',
			isArray: true
		}
	});
});