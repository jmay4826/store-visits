/*eslint-disable*/
angular.module('floorplan').controller('commentModalController', function($scope, $mdDialog) {
  $scope.tags = [];
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.addComment = function() {
    comment = {
      image: $scope.image,
      content: $scope.content,
      tags: $scope.tags,
    };
    $mdDialog.hide(comment);
  };
});
