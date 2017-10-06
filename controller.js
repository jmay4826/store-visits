const aws = require('aws-sdk');
const dotenv = require('dotenv');

require('dotenv').config();

aws.config.region = 'us-east-2';

// ////AUTH//////

const getLocations = (req, res) => {
  console.log(req.user);
  const db = req.app.get('db');
  db.getLocations(req.user.userid).then(response => res.send(response));
};
const getLocation = (req, res) => {
  const db = req.app.get('db');
  db.getLocation(req.params.id).then(response => res.send(response));
};
const addLocation = (req, res) => {
  const db = req.app.get('db');
  const {
    id, name, latitude, longitude, floorplan, district, active
  } = req.body;
  console.log(floorplan);
  db
    .addLocation([id, name, latitude, longitude, floorplan, district, active])
    .then(response => res.send(response));
};
const getComments = (req, res) => {
  const db = req.app.get('db');
  db.getComments(req.params.id).then(response => res.send(response));
};
const signS3 = (req, res) => {
  const { S3_BUCKET } = process.env;
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    res.write(JSON.stringify(returnData));
    res.end();
  });
};
const addComment = (req, res) => {
  const db = req.app.get('db');
  const { newComment } = req.body;
  db
    .addComment([
      newComment.content,
      newComment.author,
      newComment.location,
      newComment.x,
      newComment.y,
      newComment.imagePath
    ])
    .then(response => res.json(response));
};
const deleteComment = (req, res) => {
  const db = req.app.get('db');
  db.deleteComment([req.params.id]).then(response => res.json(response));
};
const firstrun = (req, res) => {
  const db = req.app.get('db');
  db.createTables().then(response => res.redirect('/'));
};

module.exports = {
  getLocations,
  getLocation,
  addLocation,
  getComments,
  signS3,
  addComment,
  deleteComment,
  firstrun
};
