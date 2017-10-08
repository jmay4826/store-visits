angular
  .module('floorplan')
  .controller('headerController', function ($scope, $state, $mdSidenav, headerService, authService) {
    // $timeout(() => ($scope.location = $stateParams.id), 100);
    $scope.user = authService.currentUser;
    $scope.title = headerService.getTitle;
    $scope.toggleNav = function () {
      $mdSidenav('nav').toggle();
    };
    $scope.logout = function () {
      console.log('logout');
      authService.logout().then((response) => {
        console.log(response);
        $state.go('home');
      });
    };
  });
