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
  .module('floorplan', [
    'ui.router',
    'ngMaterial',
    'ngAnimate',
    'ngFileUpload',
    'duScroll',
    'ngMessages',
    'chart.js',
    'ngGeolocation'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    //* **TEMPORARY***CHANGE OTHERWISE TO /
    $urlRouterProvider.otherwise('/');
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
      .state('register', {
        url: '/register',
        templateUrl: './register/register.template.html',
        controller: 'registerController'
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
          locations(locationService) {
            console.log('resolved locations');
            return locationService.getLocations().then(response => response.data);
          }
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
      })
      .state('tagsAdmin', {
        url: '/admin/tags',
        templateUrl: './admin/tags.admin.template.html',
        controller: 'tagsAdminController',
        resolve: {
          existingTags(tagService) {
            return tagService.getTagTemplate().then((response) => {
              const categories = {};
              if (!response.data.length) return;
              response.data.forEach((tag) => {
                if (!categories[tag.category]) {
                  categories[tag.category] = {};
                }
                if (!categories[tag.category][tag.subcategory]) {
                  categories[tag.category][tag.subcategory] = [];
                }
                categories[tag.category][tag.subcategory].push({ title: tag.title });
              });
              console.log(categories);
              return categories;
            });
          }
        }
      })
      .state('analytics', {
        url: '/analytics',
        templateUrl: '/./analytics/analytics.template.html',
        controller: 'analyticsController',
        resolve: {
          authorized
        }
      });
  })
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue-grey');
  });
