angular.module('floorplan').service('commentService', function ($http) {
  this.serviceTest = 'yes';
  this.getComments = id => $http.get(`/api/location/${id}/comments`);
  this.addLocation = newLocation => $http.post('/api/locations/new', { data: newLocation });
});
