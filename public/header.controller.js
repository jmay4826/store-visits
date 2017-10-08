angular
  .module('floorplan')
  .controller('headerController', function ($scope, $mdSidenav, headerService, authService) {
    // $timeout(() => ($scope.location = $stateParams.id), 100);
    $scope.user = authService.currentUser;
    $scope.title = headerService.getTitle;
    $scope.toggleNav = function () {
      $mdSidenav('nav').toggle();
    };
  });
