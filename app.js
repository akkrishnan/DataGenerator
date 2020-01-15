/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// const sample = require('./routes/sample.js');
const app = express();
const routes = require('./routes/routes.js');
const userRoutes = require('./routes/requests.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': 'false'
}));
// app.use(bodyParser.urlencoded({ extended: true }));

//Put your angular dist folder here
app.use(express.static(path.join(__dirname, './dist/DataGenerator')));
app.use('/login', express.static(path.join(__dirname, './dist/DataGenerator')));
app.use('/api', routes);
app.use('/api/getTopRequests', userRoutes);
module.exports = app;
