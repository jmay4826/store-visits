angular.module('floorplan').service('authService', function ($http, $q) {
  let currentUser;
  this.login = (username, password) =>
    $http.post('/auth/login', { username, password }).then((response) => {
      currentUser = response.data.passport.user;
    });
  this.register = (username, password) => $http.post('/auth/register', { username, password });

  this.getCurrentUser = function () {
    const defer = $q.defer();
    if (!currentUser) {
      $http
        .get('/authcheck')
        .then((response) => {
          currentUser = response.data;
          defer.resolve(currentUser);
        })
        .catch(err => defer.resolve());
    } else {
      defer.resolve(currentUser);
    }
    return defer.promise;
  };
});
