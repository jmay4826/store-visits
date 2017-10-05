angular
  .module('floorplan')
  .controller('locationController', function ($scope, commentService, comments, location) {
    $scope.s3path = 'https://s3.us-east-2.amazonaws.com/floorplans-uploads/';
    $scope.comments = comments;
    [$scope.location] = location;

    $scope.showModal = function ($event) {
      const newComment = {};
      const imgHeight = $event.srcElement.clientHeight;
      const imgWidth = $event.srcElement.clientWidth;
      // This might not work in all browsers....but neither will flexbox sooooo
      console.log($event.srcElement.clientHeight);
      newComment.x = $event.layerX / imgWidth * 100;
      newComment.y = $event.layerY / imgHeight * 100;
      $scope.comments.push(newComment);
      console.log($event);
    };
  });
