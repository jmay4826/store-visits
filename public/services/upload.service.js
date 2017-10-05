angular.module('floorplan').service('uploadService', function ($http, Upload) {
  const AWS_ACCESS_KEY_ID = 'AKIAJFBX42GIFPQHAIOQ';
  const POLICY =
    'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImZsb29ycGxhbnMtdXBsb2FkcyJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLAogICAgeyJhY2wiOiAicHVibGljLXJlYWQifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGZpbGVuYW1lIiwgIiJdLAogICAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KICBdCn0=';
  const SIGNATURE = '5cvUn1v8vsmjEPXc4UONdDkhw80=';

  this.rename = (file, location) => {
    const ext = file.type.substr(file.type.length - 3);

    return Upload.rename(file, `floorplans/${location}.${ext}`);
  };
  this.upload = (file) => {
    console.log(file);

    return $http
      .get(`/sign-s3?file-name=${file.ngfName}&file-type=${file.type}`)
      .then(response => $http.put(response.data.signedRequest, file));
  };
});
