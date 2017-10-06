angular.module('floorplan').service('userService', function ($http) {
  this.getUsers = () => $http.get('/api/users').then(response => response.data);
});
