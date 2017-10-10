angular.module('floorplan').service('analyticsService', function ($http) {
  this.getCommentData = () => $http.get('/api/analytics/comments');
});
