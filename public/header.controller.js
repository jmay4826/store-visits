angular
  .module('floorplan')
  .controller('headerController', function (
    $scope,
    $state,
    $mdSidenav,
    headerService,
    authService,
    $mdDialog
  ) {
    // $timeout(() => ($scope.location = $stateParams.id), 100);
    $scope.user = authService.currentUser;
    $scope.title = headerService.getTitle;
    $scope.menuItems = headerService.getMenuItems;
    $scope.toggleNav = function () {
      $mdSidenav('nav').toggle();
    };
    $scope.logout = function () {
      console.log('logout');
      authService.logout().then((response) => {
        console.log(response);
        $state.go('login');
      });
    };
    $scope.toggleMenu = function ($mdMenu, ev) {
      $mdMenu.open(ev);
    };
    // $scope.menuItems = ['item1', 'item2', 'item4'];
  });
