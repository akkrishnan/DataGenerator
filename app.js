/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./services/config.js');
const routes = require('./routes/routes.js');
const userContextRoutes = require('./services/usercontext.js');
const topRequestRoutes = require('./services/requests.js');
const updateJSONRoutes = require('./services/updateJSON.js');
const generateCSVRoutes = require('./services/generate.js');
// const mongoConnect = require('./services/mongodbconnection.js');
const userRoutes = require('./services/getusers.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//Angular dist folder here
app.use(express.static(path.join(__dirname, './dist/DataGenerator')));
app.use('/login', express.static(path.join(__dirname, './dist/DataGenerator')));
app.use('/home', express.static(path.join(__dirname, './dist/DataGenerator')));
app.use('/datagen', express.static(path.join(__dirname, './dist/DataGenerator')));
//Angular dist folder here
app.use('/api', routes);
app.use('/api/validateLogin', userContextRoutes.postUserContext);
app.use('/api/getUserContext', userContextRoutes.getUserContext);
app.use('/api/getUserID', userContextRoutes.getUserID);
app.use('/api/getTopRequests', topRequestRoutes);
app.use('/api/savedatarequest', updateJSONRoutes);
app.use('/api/generatedatarequest', generateCSVRoutes);
app.use('/api/getAllUsers', userRoutes.getAllUsers);
app.use('/api/getUserById/:id', userRoutes.getUserById);
app.use('*', function (req, res) {
  res.status(404).send(config.notFoundMessage());
});
module.exports = app;
