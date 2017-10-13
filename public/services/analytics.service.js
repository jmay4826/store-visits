angular.module('floorplan').service('analyticsService', function ($http) {
  this.getAnalytics = () => $http.get('/api/analytics');
  this.getlocationResolutionTime = () => $http.get('api/analytics?q=time&for=locations');
  this.gettagResolutionTime = () => $http.get('api/analytics?q=time&for=tags');
  this.gettagBreakdownByLocation = () => $http.get('api/analytics?q=tags');
});
