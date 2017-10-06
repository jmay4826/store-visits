/*eslint-disable*/
angular
  .module('floorplan')
  .controller('loginController', function($scope, $stateParams, $state, authService) {
    $scope.login = function() {
      authService
        .login($scope.username, $scope.password)
        .then(response => $state.go('locations'))
        .catch(err => ($scope.response = 'Username or password not recognized'));
    };

    $scope.error = $stateParams.error;
  });
