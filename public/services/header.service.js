angular.module('floorplan').service('headerService', function ($http) {
  let currentTitle = 'Welcome';
  this.getTitle = function () {
    return currentTitle;
  };
  this.setTitle = (newTitle) => {
    currentTitle = newTitle;
  };
  const menuItems = [
    { title: 'none', action: () => console.log('none') },
    { title: 'none', action: () => console.log('none') }
  ];

  this.getMenuItems = () => {
    console.log(menuItems);
    return menuItems;
  };

  this.setMenuItems = (items) => {
    this.menuItems = items;
  };

  this.color = 'light-blue';
});
