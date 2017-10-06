angular
  .module('floorplan')
  .controller('locationsController', function ($scope, locationService, locations, authService) {
    $scope.locations = locations;
    $scope.currentUser = authService.currentUser;
  });
