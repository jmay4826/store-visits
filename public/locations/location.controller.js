angular
  .module('floorplan')
  .controller('locationController', function (
    $scope,
    commentService,
    comments,
    location,
    $mdDialog,
    authorized,
    headerService,
    $state,
    replyService
  ) {
    $scope.S3PATH = 'https://s3.us-east-2.amazonaws.com/floorplans-uploads/';
    $scope.comments = comments;
    [$scope.location] = location;
    $scope.user = authorized;
    $scope.whichComments = { complete: false };
    $scope.highlighted = 1;

    headerService.setTitle(`${$scope.location.name} (${$scope.location.id})`);
    const menuItems = [
      {
        userType: 'all',
        title: 'Show Archived Comments',
        action() {
          $scope.archiveFilter = false;
        }
      }
    ];

    headerService.setMenuItems(menuItems);

    const addComment = (comment, coordinates) => {
      const newComment = {
        image: comment.image,
        content: comment.content,
        tags: comment.tags,
        x: coordinates.x,
        y: coordinates.y,
        author: $scope.user.username,
        location: $scope.location.id
      };
      return commentService.addComment(newComment);
    };

    $scope.deleteComment = function (id, index) {
      commentService.deleteComment(id).then((response) => {
        $scope.comments.splice(index, 1);
      });
    };

    $scope.updateComment = (id, index) =>
      commentService.updateComment(id).then((response) => {
        $scope.comments.splice(index, 1);
        return response;
      });

    $scope.addReply = (replyText, commentId) => replyService.addReply(replyText, commentId);

    $scope.showModal = function (event) {
      const imgHeight = event.srcElement.clientHeight;
      const imgWidth = event.srcElement.clientWidth;
      const coordinates = {
        x: event.layerX / imgWidth * 100,
        y: event.layerY / imgHeight * 100
      };

      $mdDialog
        .show({
          templateUrl: './comments/comment.modal.template.html',
          controller: 'commentModalController',
          // parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: true,
          resolve: {
            tagTemplate(tagService) {
              return tagService.getTagTemplate();
            }
          }
        })
        .then(response => addComment(response, coordinates))
        .then((response) => {
          commentService.getComments($scope.location.id).then((response) => {
            console.log(response);
            $scope.comments = response.data;
          });
          // $scope.comments.push(response.data[0]);
          // maybe we could find a better way to do this to avoid the flash on reload?
          // $state.reload();
        });

      // This might not work in all browsers....but neither will flexbox sooooo
      // Confirmed it acts funny on iOS if you scroll past the initial view
      // console.log(event.srcElement.clientHeight);
      // $scope.comments.push(newComment);
      // console.log(event);
    };
  });
