angular
  .module('floorplan')
  .controller('locationController', function ($scope, commentService, comments, location) {
    $scope.comments = comments;
    [$scope.location] = location;

    $scope.showModal = function ($event) {
      console.log($event);
    };
  });
