/*jshint esversion: 6 */
const express = require('express');
const usersRouter = express.Router();
const fs = require('fs');
const config = require('../config.js');
const topReqDataPath = config.topReqDataPath;

usersRouter.get('/', (req, res) => {
  fs.readFile(topReqDataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});
module.exports = usersRouter;
