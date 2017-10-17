angular
  .module('floorplan')
  .controller('analyticsController', function ($scope, analyticsService, headerService) {
    let currentAnalytics = {};
    const defaultOptions = {
      title: {
        display: true,
        text: 'Hover for labels. Click to view details.'
      }
    };
    analyticsService.getlocationResolutionTime().then((response) => {
      currentAnalytics = response.data;
      $scope.currentAnalytics = currentAnalytics;
      $scope.getlocationResolutionTime();
    });

    headerService.setTitle('Analytics');
    $scope.chart = {};

    $scope.selectedChart = 'locationResolutionTime';
    $scope.chart.options = {
      title: {
        display: true,
        text: 'Hover for labels. Click for details.'
      }
    };

    $scope.charts = {
      locationResolutionTime: 'Average Resolution Time By Location',
      tagResolutionTime: 'Average Resolution Time By Tag',
      tagBreakdownByLocation: 'Number of Comments By Tag'
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
      $scope.chart.type = 'horizontalBar';
      $scope.chart.labels = currentAnalytics.map(row => row.name);
      console.log(currentAnalytics);
      $scope.chart.data = currentAnalytics.map(row => moment.duration(row.avg));

      if (currentAnalytics.length > 0) {
        $scope.chart.data.push(moment.duration(currentAnalytics[0].all_avg));
        $scope.chart.labels.push('Overall');
      }

      $scope.chart.options = {
        onClick(e, a) {
          $scope.gettimeDetailForLocation(currentAnalytics[a[0]._index].location_id);
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Average Resolution Time'
              },
              ticks: {
                callback(v) {
                  return humanize(v);
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              return `${humanize(tooltipItem.xLabel)}`;
            }
          }
        }
      };
    };
    $scope.chart.options.onClick = (e, a) => console.log(e, a);

    $scope.gettagResolutionTime = function () {
      $scope.chart.type = 'horizontalBar';
      $scope.chart.labels = currentAnalytics.map((row) => {
        row.title = row.title ? row.title : 'None';
        return row.category ? `${row.category} - ${row.subcategory} - ${row.title}` : 'None';
      });
      $scope.chart.data = currentAnalytics.map(row => moment.duration(row.avg));
      if (currentAnalytics.length > 0) {
        $scope.chart.data.push(moment.duration(currentAnalytics[0].all_avg));
        $scope.chart.labels.push('Overall');
      }
      $scope.chart.options = {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Average Resolution Time'
              },
              ticks: {
                callback(v) {
                  return humanize(v);
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              return `${humanize(tooltipItem.xLabel)}`;
            }
          }
        }
      };
    };

    $scope.gettagBreakdownByLocation = function () {
      $scope.chart.type = 'pie';
      $scope.chart.labels = currentAnalytics.map(row => (row.category ? `${row.category} - ${row.subcategory} - ${row.title}` : 'None'));
      $scope.chart.data = currentAnalytics.map(row => row.count);
      $scope.chart.options = {};
      $scope.chart.options = defaultOptions;
    };

    $scope.gettimeDetailForLocation = (locationid) => {
      console.log(locationid);
      analyticsService.gettimeDetailForLocation(locationid).then((response) => {
        console.log(response);
        $scope.resultsDetail = response.data;
      });
    };
  });

function humanize(epoch) {
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
