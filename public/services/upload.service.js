angular.module('floorplan').service('uploadService', function ($http, Upload, $sce) {
  this.uploadCommentImage = (commentObject, id) => {
    // rename the file to whatever it needs to be.
    console.log(commentObject);
    const ext = commentObject.image.type.split('/')[1];
    return Upload.rename(commentObject.image, `${commentObject.location}/${id}.${ext}`);
    // sign it and upload it
  };
  this.rename = (file, location) => {
    console.log(file.type);
    const ext = file.type.split('/')[1];

    return Upload.rename(file, `floorplans/${location}.${ext}`);
  };
  this.upload = (file) => {
    console.log(file);

    return $http
      .get($sce.trustAsResourceUrl(`/sign-s3?file-name=${file.ngfName}&file-type=${file.type}`))
      .then((response) => {
        console.log(response);
        return $http({
          method: 'PUT',
          url: $sce.trustAsResourceUrl(response.data.signedRequest),
          headers: {
            'Content-Type': file.type
          },
          data: file
        });
      });
  };
});
