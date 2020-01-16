/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// const sample = require('./routes/sample.js');
const app = express();
const routes = require('./routes/routes.js');
const userRoutes = require('./routes/requests.js');
const updateJSONRoutes = require('./services/updateJSON.js');
const generateCSVRoutes = require('./services/generate.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': 'false'
}));
// app.use(bodyParser.urlencoded({ extended: true }));

//Put your angular dist folder here
app.use(express.static(path.join(__dirname, './dist/DataGenerator')));
app.use('/login', express.static(path.join(__dirname, './dist/DataGenerator')));
app.use('/datagen', express.static(path.join(__dirname, './dist/DataGenerator')));
app.use('/api', routes);
app.use('/api/getTopRequests', userRoutes);
app.use('/api/savedatarequest', updateJSONRoutes);
app.use('/api/generatedatarequest', generateCSVRoutes);
module.exports = app;
