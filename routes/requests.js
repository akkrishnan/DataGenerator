/*jshint esversion: 6 */
const express = require('express');
const usersRouter = express.Router();
const fs = require('fs');
const dataPath = './data/toprequests.json';

usersRouter.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});
module.exports = usersRouter;
