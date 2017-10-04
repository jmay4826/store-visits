angular
  .module('floorplan')
  .controller('locationsController', function ($scope, locationService, locations) {
    $scope.test = 'list location';
    $scope.locations = locations;
    $scope.serviceTest = locationService.serviceTest;
  });
