angular
  .module('floorplan')
  .controller('registerController', function (
    $scope,
    $stateParams,
    $state,
    authService,
    headerService
  ) {
    $scope.register = function () {
      if ($scope.registerForm.$valid) {
        authService
          .register($scope.username, $scope.password)
          .then(response => $state.go('locations'))
          .catch((err) => {
            console.log(err);
            if (err.status === 400) {
              $scope.response = 'Username already exists. Please try again.';
            }
          });
      } else {
        $scope.loginForm.$setDirty();
      }
    };

    headerService.setTitle('Register');
  });
