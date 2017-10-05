angular
  .module('floorplan')
  .controller('locationController', function ($scope, commentService, comments, location) {
    $scope.s3path = 'https://s3.us-east-2.amazonaws.com/floorplans-uploads/';
    $scope.comments = comments;
    [$scope.location] = location;

    $scope.showModal = function ($event) {
      const newComment = {};
      // This might not work in all browsers....but neither will flexbox sooooo
      newComment.x = $event.layerX;
      newComment.y = $event.layerY;
      $scope.comments.push(newComment);
      console.log($event);
    };
  });
