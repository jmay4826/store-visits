angular
  .module('floorplan')
  .controller('analyticsController', function ($scope, analyticsService, commentsData) {
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
    $scope.analytics = commentsData;
    $scope.labels = commentsData.map(row => row.location);
    $scope.data = commentsData.map(row => moment.duration(row.avg));
    $scope.labels.push('Overall');
    $scope.data.push(moment.duration(commentsData[0].all_avg));
    $scope.options = {
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
  });
