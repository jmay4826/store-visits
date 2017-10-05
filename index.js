const express = require('express');
const controller = require('./controller');
// const config = require('./config');
const dotenv = require('dotenv');
const massive = require('massive');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

massive(process.env.DATABASE_URL).then(dbInstance => app.set('db', dbInstance));

app.get('/firstrun', controller.firstrun);
app.get('/api/location/:id', controller.getLocation);
app.get('/api/locations', controller.getLocations);
app.get('/api/location/:id/comments', controller.getComments);
app.post('/api/locations/new', controller.addLocation);
app.get('/sign-s3', controller.signS3);

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
