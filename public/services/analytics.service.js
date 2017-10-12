angular.module('floorplan').service('analyticsService', function ($http) {
  this.getAnalytics = () => $http.get('/api/analytics');
});
