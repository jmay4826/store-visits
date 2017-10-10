angular
  .module('floorplan')
  .controller('analyticsController', function ($scope, analyticsService, commentsData) {
    $scope.analytics = commentsData;
  });
