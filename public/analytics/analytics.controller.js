angular.module('floorplan').controller('analyticsController', function ($scope, $http) {
  $scope.works = 'works';
  $http.get('/api/analytics').then((response) => {
    $scope.analytics = response.data;
  });
});
