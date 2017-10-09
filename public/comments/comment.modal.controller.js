/*eslint-disable*/
angular
  .module('floorplan')
  .controller('commentModalController', function($scope, $mdDialog, tagService) {
    tagService.getTagTemplate().then(response => {
      $scope.categories = response;
    });
    $scope.addTag = function(tag) {
      if ($scope.selectedTags.indexOf(tag) === -1) {
        $scope.selectedTags.push(tag);
      }
    };

    $scope.selectedTags = [];
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.addComment = function() {
      comment = {
        image: $scope.image,
        content: $scope.content,
        tags: $scope.tags
      };
      $mdDialog.hide(comment);
    };
  });
