/*eslint-disable*/
angular
  .module('floorplan')
  .controller('commentModalController', function($scope, $mdDialog, tagService, tagTemplate) {
    // tagService.getTagTemplate().then(response => {
    $scope.categories = tagTemplate;
    // });
    $scope.addTag = function(category, subcategory, tagTitle) {
      // if ($scope.selectedTags.indexOf(tag) === -1) {
      $scope.selectedTags.push({ category, subcategory, title: tagTitle });
      // }
    };
    // $scope.shown = {
    //   Facilities: true,
    //   Interior: true
    // };

    $scope.selectedTags = [];
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.addComment = function() {
      comment = {
        image: $scope.image,
        content: $scope.content,
        tags: $scope.selectedTags
      };
      $mdDialog.hide(comment);
    };
  });
