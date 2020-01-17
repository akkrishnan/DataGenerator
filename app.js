/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// const sample = require('./routes/sample.js');
const app = express();
const routes = require('./routes/routes.js');
const userContextRoutes = require('./services/usercontext.js');
const topRequestRoutes = require('./services/requests.js');
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
// app.use('/home', express.static(path.join(__dirname, './dist/DataGenerator')));
// app.use('/datagen', express.static(path.join(__dirname, './dist/DataGenerator')));
app.use('/api', routes);
app.use('/api/userContext', userContextRoutes.postUserContext);
app.use('/api/getUserContext', userContextRoutes.getUserContext);
app.use('/api/getTopRequests', topRequestRoutes);
app.use('/api/savedatarequest', updateJSONRoutes);
app.use('/api/generatedatarequest', generateCSVRoutes);
module.exports = app;
