angular
  .module('floorplan')
  .controller('locationsController', function (
    $scope,
    locationService,
    locations,
    authService,
    headerService,
    authorized
  ) {
    $scope.user = authorized;
    $scope.locations = locations;
    $scope.currentUser = authService.currentUser;
    headerService.setTitle('Choose a location');
  });
