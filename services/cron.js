/*jshint esversion: 6 */
const cron = require('cron');
const path = require('path');
const express = require('express');
const http = require('http');
const request = require('request');
const fs = require('fs');
const config = require('./config');
// const readFile = fs.readFile;
const writeFile = fs.writeFile;
var dynamicData;
// const directoryPath = path.join(__dirname, '../../../../../TDM/Application/output');
const directoryPath = path.join(__dirname, '../output');
const topReqDataPath = config.topReqDataPath();
const topRequestURL = 'http://localhost/api/getTopRequests';
var finalArray = [];
var outputArray = [];
const statusObj = {
  'TODO': 'IN QUEUE',
  'INPROGRESS': 'IN PROGRESS',
  'DONE': 'COMPLETED',
  'OTHERS': 'REJECTED'
};

const colorObj = {
  'INQUEUE': 'lime',
  'IN QUEUE': 'lime',
  'REJECTED': 'red',
  'IN PROGRESS': 'orange',
  'INPROGRESS': 'orange',
  'COMPLETED': 'green'
};

const cronScheduler = '*/5 * * * * *';
// app = express();

/* request(topRequestURL, function (error, response, data) {
  dynamicData = data;
  processTopRequest(dynamicData);
}); */

const job = cron.job(cronScheduler, () => {
  console.log('running a task every 5 sec'); 
  request(topRequestURL, function (error, response, data) {
    dynamicData = data;
    console.log(data);
    console.log('========== CALLED API');
    if (typeof data !== "undefined") {
      processTopRequest(dynamicData);
    }
  });
});

job.start();

function processTopRequest(dynamicData) {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      console.log(dynamicData);
      fileSplitValue = file.split('_');
      requestID = fileSplitValue[1];
      status = fileSplitValue[fileSplitValue.length - 1].split('.')[0];
      parsedJSON = JSON.parse(dynamicData);
      console.log(parsedJSON);
      // rec = parsedJSON.filter(function (item, index) { f = index; return item.id == requestID; });
      idx = parsedJSON.findIndex(function (item, index) {
        return item.id == requestID;
      });
      if (idx > -1) {
        rec = parsedJSON[idx];
        if (rec.status !== statusObj.DONE && status === statusObj.DONE) {
          rec.status = status;
          rec.color = (status === statusObj.DONE) ? (colorObj[status]) : (rec.color);
          //   console.log('========= rec.status ===========');
          //   console.log(rec.status);
          //   console.log('========= rec.status ===========');
          //   finalArray = [...new Set([...parsedJSON, ...[rec]])];
          finalArray = Array.from(new Set(parsedJSON.concat([rec])));
          dynamicData = JSON.stringify(finalArray);

          console.log('=========== dynamicData 111 ============');
          console.log(dynamicData);
          console.log('=========== dynamicData 111 ============');
        }
      }
    });

    console.log('============== updating this data dynamicData=================== ');
    console.log(dynamicData);
    console.log('============== updating this data dynamicData=================== ');

    writeFile(topReqDataPath, dynamicData, (err) => {
      if (err) {
        console.log(err); // Do something to handle the error or just throw it
        throw new Error(err);
      }
      console.log('Successfully updated the top requests!');
    });
  });
}
