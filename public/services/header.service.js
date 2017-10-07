angular.module('floorplan').service('headerService', function ($http) {
  let currentTitle = 'Welcome';
  this.getTitle = function () {
    return currentTitle;
  };
  this.setTitle = (newTitle) => {
    currentTitle = newTitle;
  };
});
