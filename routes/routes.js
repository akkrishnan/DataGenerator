/*jshint esversion: 6 */
const express = require('express'); // load up our shiny new route for users
const appRouter = express.Router();
appRouter.get('/', function (req, res, next) {
  res.send('Welcome to the Data Generator RESTful API Server');
});

module.exports = appRouter;
