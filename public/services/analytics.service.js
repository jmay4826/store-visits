angular.module('floorplan').service('analyticsService', function ($http) {
  this.getAnalytics = () => $http.get('/api/analytics');
  this.getlocationResolutionTime = () => $http.get('/api/analytics?q=time&for=locations');
  this.gettagResolutionTime = () => $http.get('/api/analytics?q=time&for=tags');
  this.gettagBreakdownByLocation = () => $http.get('/api/analytics?q=tags');
  this.gettimeDetailForLocation = locationid => $http.get(`/api/analytics/${locationid}/time`);
  this.getcommentsByTag = dataObject =>
    $http.get(`/api/analytics/tags?category=${dataObject.category}&subcategory=${dataObject.subcategory}&title=${dataObject.title}`);
});
