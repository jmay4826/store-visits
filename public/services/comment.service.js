angular.module('floorplan').service('commentService', function ($http, uploadService, tagService) {
  this.serviceTest = 'yes';
  this.getComments = id =>
    $http.get(`/api/location/${id}/comments`).then((commentResponse) => {
      console.log(commentResponse);
      const commentIds = commentResponse.data.map((comment) => {
        console.log(comment);
        return comment.id;
      });

      tagService.getTags(id).then((tagResponse) => {
        tagResponse.data.forEach((tag) => {
          const relatedComment = commentResponse.data.find(comment => comment.id === tag.comment_id);

          if (!relatedComment.tags) {
            relatedComment.tags = [];
          }
          relatedComment.tags.push(tag);
        });
        return commentResponse;
      });
      return commentResponse;
    });

  this.addComment = (newComment) => {
    newComment.imagePath = newComment.image ? newComment.image.type.substr(-3) : null;
    return $http
      .post(`/api/location/${newComment.location}/comments/new`, { newComment })
      .then((response) => {
        const newCommentId = response.data[0].id;
        // if there are tags
        if (newComment.tags.length > 0) {
          console.log(newComment.tags);
          tagService
            .addTagsByCommentId(newComment.tags, newCommentId)
            .then(response => console.log('tag response', response));
        }
        // if there's an image
        if (newComment.image) {
          // wait until the image is uploaded to resolve the new comment promise
          return uploadService
            .upload(uploadService.uploadCommentImage(newComment, newCommentId))
            .then(() => response); // return the new comment response, NOT the image upload response
        }
        return response;
      });
  };

  this.deleteComment = id => $http.delete(`/api/comment/${id}`);
});
