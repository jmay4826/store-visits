const aws = require('aws-sdk');
const dotenv = require('dotenv');

require('dotenv').config();

aws.config.region = 'us-east-2';

const getUsers = (req, res) => {
  const db = req.app.get('db');
  db.getUsers().then(response => res.json(response));
};

const getTags = (req, res) => {
  const db = req.app.get('db');
  db.getTags(req.params.commentid).then(response => res.json(response));
};

const addTags = (req, res) => {
  const db = req.app.get('db');
  const tags = req.body.tags.map(tag => ({
    title: tag.title,
    category: tag.category,
    subcategory: tag.subcategory,
    comment_id: req.body.comment
  }));
  console.log(tags);
  db.clearTags(tags[0].comment_id).then((response) => {
    db.tags.insert(tags).then(response => res.json(response));
  });
};
const getLocations = (req, res) => {
  console.log(req.user);
  const db = req.app.get('db');
  db.getLocations(req.user.username).then(response => res.send(response));
};
const getLocation = (req, res) => {
  const db = req.app.get('db');
  db.getLocation(req.params.id).then(response => res.send(response));
};
const addLocation = (req, res) => {
  const db = req.app.get('db');
  const {
    id, name, latitude, longitude, floorplan, district, active, allowedUsers
  } = req.body;
  const permissions = allowedUsers.map(user => ({ userid: user, location: id }));
  console.log(permissions);
  db
    .addLocation([id, name, latitude, longitude, floorplan, district, active])
    .then(() => db.location_permissions.insert(permissions))
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
  firstrun,
  getUsers,
  addTags,
  getTags
};
