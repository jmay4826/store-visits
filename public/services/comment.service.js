angular.module('floorplan').service('commentService', function ($http, uploadService) {
  this.serviceTest = 'yes';
  this.getComments = id => $http.get(`/api/location/${id}/comments`);
  this.addComment = (newComment) => {
    newComment.imagePath = newComment.image ? newComment.image.type.substr(-3) : null;
    return $http
      .post(`/api/location/${newComment.location}/comments/new`, { newComment })
      .then((response) => {
        // if there's an image
        if (newComment.image) {
          // wait until the image is uploaded to resolve the new comment promise
          return uploadService
            .upload(uploadService.uploadCommentImage(newComment, response.data[0].id))
            .then(() => response); // return the new comment response, NOT the image upload response
        }
        return response;
      });
  };

  this.deleteComment = id => $http.delete(`/api/comment/${id}`);
});
