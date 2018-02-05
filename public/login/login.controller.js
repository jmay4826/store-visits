/*eslint-disable*/
angular
  .module('floorplan')
  .controller('loginController', function(
    $scope,
    $stateParams,
    $state,
    authService,
    headerService,
    $mdDialog
  ) {
    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        authService
          .login($scope.username, $scope.password)
          .then(response => $state.go('locations'))
          .catch(err => ($scope.response = 'Username or password not recognized'));
      } else {
        $scope.loginForm.$setDirty();
      }
    };
    $mdDialog.show(
      // { templateUrl: 'login/dialog.template.html' }
      $mdDialog
        .alert()
        .clickOutsideToClose(true)
        .title('Welcome')
        .textContent(
          'This is a fully functioning demo of a merchandising and facilities management system designed using AngularJS, NodeJS, Express, and PostgreSQL. There are three user types -- employee, analyst, and admin. The username and password for the demo admin account have been autofilled, just click login to continue. Thanks for taking a look!'
        )
        .ok('OK')
    );
    headerService.setTitle('Login');
    $scope.username = 'demoadmin';
    $scope.password = 'password';
    // $scope.visibleError = $stateParams.error;
  });
