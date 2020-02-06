/*jshint esversion: 6 */
const express = require('express'); // load up our shiny new route for users
const config = require('../services/config');
const appRouter = express.Router();
appRouter.get('/', function (req, res, next) {
  res.send(config.startupMessage());
});

module.exports = appRouter;
