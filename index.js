const express = require('express');
const controller = require('./controller');
// const config = require('./config');
const dotenv = require('dotenv');
const massive = require('massive');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser((user, done) => {
  done(null, { username: user.username.toLowerCase(), type: user.type, userid: user.id });
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(bodyParser.json({ limit: '15mb' }));

passport.use(new LocalStrategy(function (username, password, done) {
  const db = app.get('db');
  db.users.findOne({ username: username.toLowerCase() }).then(function (user) {
    if (!user) {
      return done(null, false);
    }
    const authenticated = bcrypt.compareSync(password, user.password);

    if (!authenticated) {
      return done(null, false);
    }
    return done(null, user);
  });
}));

massive(process.env.DATABASE_URL).then(dbInstance => app.set('db', dbInstance));

const isLoggedIn = function (req, res, next) {
  if (!req.user) {
    console.log('not logged in');
    return res.status(401).json('not logged in');
  }
  return next();
};

app.get('/authcheck', isLoggedIn, (req, res) => res.json(req.user));

app.post('/auth/login', passport.authenticate('local', { failureFlash: true }), (req, res) =>
  res.send(req.session));

app.post('/auth/register', (req, res) => {
  const db = req.app.get('db');
  bcrypt.hash(req.body.password, 10).then((hash) => {
    db
      .addUser([req.body.username.toLowerCase(), hash])
      .then(() => res.redirect('/auth/login'))
      .then(() => res.send(req.session))
      .catch((err) => {
        if (err.code === '23505') {
          return res.status(400).json(err);
        }
        console.log(err);
        return res.status(500).json(err);
      });
  });
});

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.json('ok');
});

app.get('/firstrun', controller.firstrun);
app.get('/api/users', isLoggedIn, controller.getUsers);
app.get('/api/location/:id', isLoggedIn, controller.getLocation);
app.get('/api/locations', isLoggedIn, controller.getLocations);
app.get('/api/location/:id/comments', isLoggedIn, controller.getComments);
app.get('/api/tags/:id', isLoggedIn, controller.getTagTemplate);
app.get('/api/analytics', isLoggedIn, controller.getAnalytics);
app.put('/api/tags/', isLoggedIn, controller.getTags);
app.post('/api/location/:id/comments/new', isLoggedIn, controller.addComment);
app.post('/api/locations/new', isLoggedIn, controller.addLocation);
app.post('/api/tags', isLoggedIn, controller.addTags);
app.get('/sign-s3', isLoggedIn, controller.signS3);
app.put('/api/comment/:id', isLoggedIn, controller.updateComment);
app.delete('/api/comment/:id', isLoggedIn, controller.deleteComment);
app.post('/api/comment/:id/replies', isLoggedIn, controller.addReply);
app.get('/api/analytics/comments', isLoggedIn, controller.getCommentsData);
app.get('/api/analytics/:locationid/time', isLoggedIn, controller.getTimeDetailForLocation);
app.get('/api/location/:id/replies', isLoggedIn, controller.getReplies);

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
