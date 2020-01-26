/*jshint esversion: 6 */
const express = require('express');
const updateJSONRouter = express.Router();
const fs = require('fs');
const readFile = fs.readFile;
const writeFile = fs.writeFile;
// const config = require('../config');
const requestDataPath = './data/requestData.json';
const topReqDataPath = './data/toprequests.json';
// const topReqDataPath = config.topReqDataPath;
// const requestDataPath = config.requestDataPath;
const request = require('request');
const userId = 'ADMIN';
const successMessage = "Your request is successfully submitted";

updateJSONRouter.post('/', (req, res) => {
  const requestBody = req.body;
  const userID = requestBody.postData.userId;
  var parsedData = {};
  console.log('========== requestBody && userID =============');
  console.log(requestBody.postData);
  console.log(userID);
  console.log('========== requestBody && userID =============');
  readFile(topReqDataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    console.log(data);
    console.log('====== data 111 ======');
    console.log(typeof data);

    try {
      if (typeof data === "string") {
        parsedData = unescape(data);
      }
      parsedData = JSON.parse(parsedData);

      console.log(parsedData);
      console.log('====== parseData ==&&&&&====');

      const sourceData = requestBody.postData;
      // console.log(sourceData);
      console.log('============== userID ==============');
      console.log(userID);
      console.log('============== userID ==============');
      const requestId = parseInt(parsedData[0].id) + 1;

      const newRecord = {
        id: requestId,
        name: userID,
        status: 'IN QUEUE',
        color: 'lime'
      };

      console.log(parsedData);
      console.log(typeof parsedData);
      console.log('====== parseData  before unshift ====');

      // parsedData = JSON.parse(parsedData);

      parsedData.unshift(newRecord);

      writeFile(topReqDataPath, JSON.stringify(parsedData), (err) => {
        if (err) {
          console.log(err); // Do something to handle the error or just throw it
          throw new Error(err);
        }
        console.log('Successfully updated the Top Requests JSON!');
      });
      console.log('=============== sourceData ==============');
      console.log(sourceData);
      sourceData.requestId = requestId;      
      writeFile(requestDataPath, JSON.stringify(sourceData), (err) => {
        if (err) {
          console.log(err); // Do something to handle the error or just throw it
          throw new Error(err);
        }
        console.log('Successfully saved to new JSON!');
      });

    } catch (e) {
      console.log('======== exception happened =============');
      console.log(e);
    }
  });
  res.send({
    success: true,
    message: successMessage
  });

});

module.exports = updateJSONRouter;
