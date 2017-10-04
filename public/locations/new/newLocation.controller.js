angular.module('floorplan').controller('newLocationController', function ($scope, locationService) {
  $scope.newLocation = {
    name: 'test',
    id: 'test',
    latitude: 1,
    longitude: 1,
    floorplan: 'test',
    district: 'test',
    active: true,
  };
  $scope.addLocation = function () {
    locationService.addLocation($scope.newLocation);
    // console.log('clicked');
    // console.log($scope.newLocation);
  };
});
