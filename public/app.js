function authorized(authService, $q, $state) {
  const defer = $q.defer();
  authService.getCurrentUser().then((response) => {
    console.log(response);
    if (!response) {
      $state.go('login', { error: 'You must be logged in to continue' });
      defer.reject('not logged in');
    } else {
      defer.resolve(response);
    }
  });
  // if (authService.getCurrentUser()) {
  //   defer.resolve(authService.getCurrentUser());
  // } else {
  //   $state.go('login', { error: 'You must be logged in to continue' });
  //   defer.reject('not logged in');
  // }
  return defer.promise;
}

angular
  .module('floorplan', ['ui.router', 'ngMaterial', 'ngAnimate', 'ngFileUpload', 'duScroll'])
  .config(function ($stateProvider, $urlRouterProvider) {
    //* **TEMPORARY***CHANGE OTHERWISE TO /
    $urlRouterProvider.otherwise('/locations');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './home/home.template.html',
        controller: 'homeController'
      })
      .state('login', {
        url: '/login',
        templateUrl: './login/login.template.html',
        controller: 'loginController',
        params: {
          error: null
        }
      })
      .state('newLocation', {
        url: '/locations/new',
        templateUrl: './locations/new/newLocation.template.html',
        controller: 'newLocationController',
        resolve: {
          authorized,
          users(userService) {
            return userService.getUsers();
          }
        }
      })
      .state('locations', {
        url: '/locations',
        templateUrl: './locations/locations.template.html',
        controller: 'locationsController',
        resolve: {
          authorized,
          locations(locationService, $state, $q) {
            // const defer = $q.defer();
            return locationService.getLocations().then(function (response) {
              // defer.resolve(response.data);
              return response.data;
            });
            //   .catch((err) => {
            //     if (err.status === 401) {
            //       $state.go('login', { error: 'You must be logged in to continue.' });
            //       defer.reject(err);
            //     }
            //   });
            // return defer.promise;
          }
          // })
        }
      })
      .state('location', {
        url: '/location/:id',
        templateUrl: './locations/location.template.html',
        controller: 'locationController',
        resolve: {
          authorized,
          comments(commentService, $stateParams) {
            return commentService.getComments($stateParams.id).then(response => response.data);
          },
          location(locationService, $stateParams) {
            return locationService.getLocation($stateParams.id).then(response => response.data);
          }
        }
      });
  })
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default');
  });
