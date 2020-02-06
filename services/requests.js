/*jshint esversion: 6 */
const express = require('express');
const topRequests = express.Router();
const fs = require('fs');
const config = require('./config');
const topReqDataPath = config.topReqDataPath();

topRequests.get('/', (req, res) => {
  fs.readFile(topReqDataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});
module.exports = topRequests;
