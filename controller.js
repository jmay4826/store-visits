const aws = require('aws-sdk');
const dotenv = require('dotenv');
require('dotenv').config();

aws.config.region = 'us-east-2';

module.exports = {
  getLocations(req, res) {
    const db = req.app.get('db');
    db.getLocations(1).then(response => res.send(response));
  },
  getLocation(req, res) {
    const db = req.app.get('db');
    db.getLocation(req.params.id).then(response => res.send(response));
  },
  addLocation(req, res) {
    const db = req.app.get('db');
    const {
      id, name, latitude, longitude, floorplan, district, active,
    } = req.body;
    console.log(floorplan);
    db
      .addLocation([id, name, latitude, longitude, floorplan, district, active])
      .then(response => res.send(response));
  },
  getComments(req, res) {
    const db = req.app.get('db');
    db.getComments(req.params.id).then(response => res.send(response));
  },
  signS3(req, res) {
    const S3_BUCKET = process.env.S3_BUCKET;
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];

    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      };

      res.write(JSON.stringify(returnData));
      res.end();
    });
  },
};
