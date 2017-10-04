const express = require('express');
const controller = require('./controller');
const config = require('./config');
const dotenv = require('dotenv');
const massive = require('massive');

require('dotenv').config();

const app = express();
app.use(express.static('public'));

massive(process.env.CONNECTION_STRING).then(dbInstance => app.set('db', dbInstance));

app.get('/api/location/:id', controller.getLocation);
app.get('/api/locations', controller.getLocations);
app.get('/api/location/:id/comments', controller.getComments);
app.post('/api/locations/new', controller.addLocation);

app.listen(config.PORT, () => console.log(`Listening on ${config.PORT}`));
