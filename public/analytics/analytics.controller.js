angular.module('floorplan').controller('analyticsController', function ($scope, analyticsService) {
  let currentAnalytics = {};
  analyticsService.getlocationResolutionTime().then((response) => {
    currentAnalytics = response.data;
    $scope.currentAnalytics = currentAnalytics;
    $scope.getlocationResolutionTime();
  });

  $scope.selectedData = 'locationResolutionTime';
  // $scope.selectedData = 'tagResolutionTime';
  $scope.selectedDataInfo = {
    locationResolutionTime: {
      type: 'barchart',
      title: 'Average Resolution Time By Location'
    },
    tagResolutionTime: {
      type: 'barchart',
      title: 'Average Resolution Time By Tag'
    },
    tagBreakdownByLocation: {
      type: 'piechart',
      title: 'Number of Comments By Tag'
    }
  };

  $scope.changeChart = (id) => {
    analyticsService[`get${id}`]().then((response) => {
      console.log(response);
      currentAnalytics = response.data;
      $scope.currentAnalytics = currentAnalytics;
      $scope[`get${id}`]();
    });
  };

  $scope.filterChart = (id) => {
    currentAnalytics = $scope.filteredArray;
    $scope[`get${id}`]();
  };

  $scope.getlocationResolutionTime = function () {
    $scope.barchart = { locationResolutionTime: {} };
    $scope.barchart.locationResolutionTime.analytics = currentAnalytics;
    $scope.barchart.locationResolutionTime.labels = currentAnalytics.map(row => row.name);
    $scope.barchart.locationResolutionTime.data = currentAnalytics.map(row =>
      moment.duration(row.avg));
    $scope.barchart.locationResolutionTime.labels.push('Overall');
    $scope.barchart.locationResolutionTime.data.push(moment.duration(currentAnalytics[0].all_avg));
    $scope.barchart.locationResolutionTime.options = {
      scales: {
        xAxes: [
          {
            // type: 'time',
            scaleLabel: {
              display: true,
              labelString: 'Average Resolution Time'
            },
            ticks: {
              callback(v) {
                return epoch_to_dd_hh_mm_ss(v);
              }
              // stepSize: 30 * 60 * 60
            }
            // stepSize: 100000000
          }
        ]
      },
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            return `${epoch_to_dd_hh_mm_ss(tooltipItem.xLabel)}`;
          }
        }
      }
    };
  };

  $scope.gettagResolutionTime = function () {
    $scope.barchart = { tagResolutionTime: {} };
    $scope.barchart.tagResolutionTime.analytics = currentAnalytics;
    $scope.barchart.tagResolutionTime.labels = currentAnalytics.map((row) => {
      row.title = row.title ? row.title : 'None';
      return row.category ? `${row.category} - ${row.subcategory} - ${row.title}` : 'None';
    });
    $scope.barchart.tagResolutionTime.data = currentAnalytics.map(row => moment.duration(row.avg));
    $scope.barchart.tagResolutionTime.labels.push('Overall');
    $scope.barchart.tagResolutionTime.data.push(moment.duration(currentAnalytics[0].all_avg));
    $scope.barchart.tagResolutionTime.options = {
      scales: {
        xAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'Average Resolution Time'
            },
            ticks: {
              callback(v) {
                return epoch_to_dd_hh_mm_ss(v);
              }
              // stepSize: 30 * 60 * 60
            }
            // stepSize: 100000000
          }
        ]
      },
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            return `${epoch_to_dd_hh_mm_ss(tooltipItem.xLabel)}`;
          }
        }
      }
    };
  };

  $scope.gettagBreakdownByLocation = function () {
    $scope.piechart = { tagBreakdownByLocation: {} };
    // $scope.piechart.tagBreakdownByLocation.analytics = currentAnalytics;
    $scope.piechart.tagBreakdownByLocation.labels = currentAnalytics.map(row => (row.category ? `${row.category} - ${row.subcategory} - ${row.title}` : 'None'));
    // $scope.piechart.tagBreakdownByLocation.labels = currentAnalytics.map(row => row.title);
    $scope.piechart.tagBreakdownByLocation.data = currentAnalytics.map(row => row.count);
    $scope.piechart.tagBreakdownByLocation.options = {
      legend: {
        display: true,
        position: 'right'
      }
    };
  };
});

function epoch_to_dd_hh_mm_ss(epoch) {
  const date = new Date(epoch);
  let dateString = '';
  if (epoch > 1000 * 60 * 60 * 24) {
    const days = date.getUTCDate();
    dateString = `${days}d`;
    epoch -= days * 1000 * 60 * 60 * 24;
  }
  if (epoch > 1000 * 60 * 60) {
    const hours = date.getUTCHours();
    dateString += `${hours}h`;
    epoch -= hours * 1000 * 60 * 60;
  }
  if (epoch > 1000 * 60) {
    const minutes = date.getUTCMinutes();
    dateString += `${minutes}m`;
    epoch -= minutes * 1000 * 60;
  }
  return dateString;
}
