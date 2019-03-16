const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const models = require('./db/models');

const workoutRoutes = require('./routes/workouts');
const authRoutes = require('./routes/auth');
const exerciseRoutes = require('./routes/exercises');
const setRoutes = require('./routes/sets');

// Create our app
const app = express();

// Set up logging
const node_env = process.env.NODE_ENV;
if (node_env === 'production' || node_env === 'staging') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

const forceSSL = (req, res, next) => {
  const node_env = process.env.NODE_ENV;
  if ((node_env !== 'production' && node_env !== 'staging')) {
    return next()
  }

  if ( req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.get('Host') + req.url);
  }
  next()
}

// Set up https redirects
app.use(forceSSL);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());

// Cookie based sessions
app.use(
  cookieSession({
    name: 'App-Session',
    keys: ['my secret key!'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Set up entity routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
workoutRoutes.use('/:workoutId/exercises', exerciseRoutes);
exerciseRoutes.use('/:exerciseId/sets', setRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

module.exports = app;


