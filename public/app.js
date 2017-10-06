angular
  .module('floorplan', ['ui.router', 'ngMaterial', 'ngAnimate', 'ngFileUpload'])
  .config(function ($stateProvider, $urlRouterProvider) {
    //* **TEMPORARY***CHANGE OTHERWISE TO /
    $urlRouterProvider.otherwise('/locations');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './home/home.template.html',
        controller: 'homeController',
      })
      .state('newLocation', {
        url: '/locations/new',
        templateUrl: './locations/new/newLocation.template.html',
        controller: 'newLocationController',
      })
      .state('locations', {
        url: '/locations',
        templateUrl: './locations/locations.template.html',
        controller: 'locationsController',
        resolve: {
          locations(locationService) {
            return locationService.getLocations().then(function (response) {
              return response.data;
            });
          },
        },
      })
      .state('location', {
        url: '/location/:id',
        templateUrl: './locations/location.template.html',
        controller: 'locationController',
        resolve: {
          comments(commentService, $stateParams) {
            return commentService.getComments($stateParams.id).then(response => response.data);
          },
          location(locationService, $stateParams) {
            return locationService.getLocation($stateParams.id).then(response => response.data);
          },
        },
      });
  })
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default');
  });
