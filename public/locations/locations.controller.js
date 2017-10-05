angular
  .module('floorplan')
  .controller('locationsController', function ($scope, locationService, locations) {
    $scope.locations = locations;
  });
