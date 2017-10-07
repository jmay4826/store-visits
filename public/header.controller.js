angular.module('floorplan').controller('headerController', function ($scope, headerService) {
  // $timeout(() => ($scope.location = $stateParams.id), 100);

  $scope.title = headerService.getTitle;
});
