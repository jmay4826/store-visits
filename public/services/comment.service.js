angular.module('floorplan').service('commentService', function ($http, uploadService) {
  this.serviceTest = 'yes';
  this.getComments = id => $http.get(`/api/location/${id}/comments`);
  this.addComment = (newComment) => {
    // eslint did this... instead of a ternary
    // newComment.image = !!newComment.image;
    newComment.imagePath = newComment.image ? newComment.image.type.substr(-3) : null;

    return $http
      .post(`/api/location/${newComment.location}/comments/new`, { newComment })
      .then((response) => {
        console.log(response);
        if (newComment.image) {
          return uploadService
            .upload(uploadService.uploadCommentImage(newComment, response.data[0].id))
            .then(uploadResponse => response);
        }
        return response;
      });
  };
});
