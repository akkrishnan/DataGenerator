/*jshint esversion: 6 */
const cron = require('cron');
const path = require('path');
const express = require('express');
const http = require('http');
const request = require('request');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../output');
var finalArray = [];
const statusObj = {
  'TODO': 'IN QUEUE',
  'INPROGRESS': 'IN PROGRESS',
  'DONE': 'COMPLETED',
  'OTHERS': 'REJECTED',
}

const colorObj = {
  'INQUEUE': 'lime',
  'IN QUEUE': 'lime',
  'REJECTED': 'red',
  'IN PROGRESS': 'orange',
  'INPROGRESS': 'orange',
  'COMPLETED': 'green'
}
// app = express();

const job = cron.job('*/5 * * * * *', () => {

  url = 'http://datagen/api/getTopRequests';
  request(url, function (error, response, data) {
    // console.log(data);
    getAllFiles(data);
  });
  // console.log('running a task every 3 sec');
});

function getAllFiles(data) {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      // console.log({ file });
      fileSplitValue = file.split('_');
      requestID = fileSplitValue[2];
      status = fileSplitValue[fileSplitValue.length - 1].split('.')[0];
      // console.log(requestID);
      // console.log(status);
      parsedJSON = JSON.parse(data);
      // console.log(parsedJSON);
      // rec = parsedJSON.filter(function (item, index) { f = index; return item.id == requestID; });
      idx = parsedJSON.findIndex(function (item, index) { return item.id == requestID });
      rec = parsedJSON[idx];
      if (idx > -1) {
        rec.status = status;
        rec.color = (status === "COMPLETED") ? (colorObj[status]) : (rec.color);
        finalArray = [...new Set([...parsedJSON, ...[rec]])];
        console.log(rec);
        console.log('======== rec ===============');
        // console.log(parsedJSON);
        // console.log('======== rec ===============');
      } 
      // console.log('=========== rec ======');
      // idx = parsedJSON.findIndex(i => i.id === requestID);
      // rec = parsedJSON[idx];
      // console.log(idx);
      /* */
      // console.log('================== EVERY LOOP ===============')
    });


    console.log('=============== finalArray =============');
    console.log(finalArray);
    console.log('=============== finalArray =============');
  });
}


function doRequest(url) {
  request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
}

job.start();
