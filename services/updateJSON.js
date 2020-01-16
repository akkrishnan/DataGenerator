/*jshint esversion: 6 */
const express = require('express');
const updateJSONRouter = express.Router();
const fs = require('fs');
const readFile = fs.readFile;
const writeFile = fs.writeFile;
const config = require('../config.js');
const requestDataPath = './data/requestData.json';
const topReqDataPath = './data/toprequests.json';
// const topReqDataPath = config.topReqDataPath;
// const requestDataPath = config.requestDataPath;
const userId = 'KRISH';
const successMessage = "Your request is successfully submitted";


updateJSONRouter.post('/', (req, res) => {
  const requestBody = req.body;
  console.log(requestBody);
  readFile(topReqDataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const parsedData = JSON.parse(data);
    const sourceData = requestBody;
    console.log(sourceData);
    const newId = parseInt(parsedData[0].id) + 1;
    const newRecord = {
      id: newId,
      name: userId,
      status: 'IN QUEUE',
      color: 'lime'
    };
    parsedData.unshift(newRecord);
    console.log('=============== FINAL JSON ==============');
    console.log(parsedData);
    // res.send(JSON.parse(data));
    writeFile(topReqDataPath, JSON.stringify(parsedData), (err) => {
      if (err) {
        console.log(err); // Do something to handle the error or just throw it
        throw new Error(err);
      }
      console.log('Successfully updated the Top Requests JSON!');
    });

    console.log(sourceData);

    writeFile(requestDataPath, JSON.stringify(sourceData), (err) => {
      if (err) {
        console.log(err); // Do something to handle the error or just throw it
        throw new Error(err);
      }
      console.log('Successfully saved to new JSON!');
    });
  });
  res.send({
    success: true,
    message: successMessage
  });

});
module.exports = updateJSONRouter;
