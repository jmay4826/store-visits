angular
  .module('floorplan')
  .controller('analyticsController', function ($scope, analyticsService, commentsData) {
    $scope.analytics = commentsData;
    $scope.labels = commentsData.map(comment => comment.name);
    $scope.data = commentsData.map(comment => comment.num_comments);
    $scope.options = {
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: '# of Open Comments'
            },
            ticks: {
              stepSize: 1
            }
          }
        ]
      }
    };
  });
