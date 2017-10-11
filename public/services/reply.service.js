angular.module('floorplan').service('replyService', function ($http, uploadService, tagService) {
  this.addReply = (replyText, commentId) =>
    $http.post(`/api/comment/${commentId}/replies`, { replyText });
  this.getReplies = locationId => $http.get(`/api/location/${locationId}/replies`);
});
