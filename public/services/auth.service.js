angular.module('floorplan').service('authService', function ($http, $q) {
  let currentUser;
  const that = this;
  this.currentUser = { username: '', type: '' };

  this.login = (username, password) =>
    $http.post('/auth/login', { username, password }).then((response) => {
      currentUser = response.data.passport.user;
      that.currentUser.type = response.data.passport.user.type;
      that.currentUser.username = response.data.passport.user.username;
    });
  this.register = (username, password) => $http.post('/auth/register', { username, password });
  this.logout = () => $http.get('/auth/logout');
  this.getCurrentUser = function () {
    const defer = $q.defer();
    if (!currentUser) {
      $http
        .get('/authcheck')
        .then((response) => {
          currentUser = response.data;

          that.currentUser.type = response.data.type;
          that.currentUser.username = response.data.username;
          //console.log('that', that.currentUser);

          defer.resolve(currentUser);
        })
        .catch(err => defer.resolve());
    } else {
      defer.resolve(currentUser);
    }
    return defer.promise;
  };
});
