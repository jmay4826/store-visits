angular
  .module('floorplan')
  .controller('tagsAdminController', function ($scope, tagService, existingTags) {
    function Category(subcategory) {
      this.subcategory = subcategory;
    }

    console.log(existingTags);
    $scope.hidden = {};
    $scope.categories = existingTags || { 'New Category': { 'New Subcategory': ['New Tag'] } };

    $scope.addCategory = function () {
      $scope.categories['New Category'] = { 'New Subcategory': ['New Tag'] };
    };
    $scope.addSubcategory = function (category) {
      $scope.categories[category]['New Subcategory'] = ['New Tag'];
    };
    $scope.addTag = function (category, subcategory) {
      $scope.categories[category][subcategory].push({ title: 'New Tag' });
    };

    $scope.saveTags = function () {
      tagService.addTagTemplate($scope.categories).then((response) => {
        console.log(response);
      });
    };
  });
