/*jshint esversion: 6 */
const cron = require('cron');
const path = require('path');
const express = require("express");
const http = require('http');
const request = require('request');
const fs = require("fs");
const directoryPath = path.join(__dirname, '../output');

// app = express();

const job = cron.job('*/3 * * * * *', () => {
  //   doRequest('http://www.google.com');
  getAllFiles();
  console.log('running a task every 3 sec');
});

function getAllFiles() {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      console.log(file);
    });
  });
}


function doRequest(url) {
  //   request(url, function (error, response, body) {
  //     console.log('error:', error); // Print the error if one occurred
  //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //     console.log('body:', body); // Print the HTML for the Google homepage.
  //   });
}

job.start();
