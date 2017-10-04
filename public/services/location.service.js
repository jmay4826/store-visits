angular.module('floorplan').service('locationService', function ($http) {
  this.serviceTest = 'yes';
  this.getLocations = () => $http.get('/api/locations');
  this.getLocation = id => $http.get(`/api/location/${id}`);
  this.addLocation = newLocation => $http.post('/api/locations/new', { data: newLocation });
});
