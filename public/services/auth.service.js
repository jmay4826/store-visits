angular.module('floorplan').service('authService', function ($http) {
  let currentUser;
  this.login = (username, password) =>
    $http.post('/auth/login', { username, password }).then((response) => {
      currentUser = response.data.passport.user;
    });

  this.getCurrentUser = function () {
    return currentUser;
  };
});
