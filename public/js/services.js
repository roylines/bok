angular.module('bokServices', ['ngResource']).
factory('Pupil', function($resource) {
	return $resource('data/pupils', {}, {
		query: {
			method: 'GET',
			isArray: true
		}
	});
});

window.addEventListener("load",function() {
    setTimeout(function(){
        window.scrollTo(0, 1);
    }, 0);
});