angular
  .module('floorplan')
  .controller('locationsController', function (
    $scope,
    locationService,
    locations,
    authService,
    headerService,
    authorized,
    $geolocation
  ) {
    $geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 5000 }).then((position) => {
      console.log(position);
      $scope.geolocation = {
        latitude: position.coords.latitude.toFixed(2),
        longitude: position.coords.longitude.toFixed(2)
      };
    });
    $scope.geolocationFilter = function (value) {
      if (!$scope.geolocation) {
        return false;
      }
      if (
        $scope.geolocation.latitude - 0.1 <= value.latitude &&
        value.latitude <= $scope.geolocation.latitude + 0.1 &&
        ($scope.geolocation.longitude - 0.1 <= value.longitude &&
          value.longitude <= $scope.geolocation.longitude + 0.1)
      ) {
        return true;
      }
      return false;
    };
    $scope.user = authorized;
    $scope.locations = locations;
    $scope.currentUser = authService.currentUser;
    headerService.setTitle('Choose a location');
  });
