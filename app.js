/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const mongoLogin = require('./secret/mongoLogin');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();

mongoose
  .connect(mongoLogin, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.warn('Connexion à MongoDB réussie !'))
  .catch(() => console.warn('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
