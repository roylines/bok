var PupilsController = function($scope, Pupil) {
  $scope.pupils = Pupil.query();
};

PupilsController.$inject = ['$scope', 'Pupil'];