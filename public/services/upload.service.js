angular.module('floorplan').service('uploadService', function ($http, Upload) {
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

    return $http.get(`/sign-s3?file-name=${file.ngfName}&file-type=${file.type}`).then(response =>
      $http({
        method: 'PUT',
        url: response.data.signedRequest,
        headers: {
          'Content-Type': file.type
        },
        data: file
      }));
  };
});
