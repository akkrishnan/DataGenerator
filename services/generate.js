/*jshint esversion: 6 */
// content of generate to CSV
const express = require('express');
const generateCSVRouter = express.Router();
const csvjson = require('csvjson');
const fs = require('fs');
const readFile = fs.readFile;
const writeFile = fs.writeFile;
const config = require('../config.js');
const successMessage = "CSV file is successfully generated";
const errorMessage = "Technical difficulties exception. Please try again!";
const requestDataPath = './data/requestData.json';
const fileExtn = '.csv';

// const requestDataPath = config.requestDataPath;
// const outputCSVPath = config.outputCSVPath;

generateCSVRouter.post('/', (req, res) => {
    readFile(requestDataPath, 'utf-8', (err, fileContent) => {
        if (err) {
            console.log(err);
            throw new Error(err);
        }
        console.log('============== fileContent =============');
        console.log(fileContent);
        console.log('============== fileContent =============');
        const parsedData = JSON.parse(fileContent);
        console.log('============== parsedData =============');
        console.log(parsedData);
        console.log('============== parsedData =============');

        const requestId = parsedData.requestId;
        const givenFileName = parsedData.FileName;
        var outputCSVPath = 'D:/TDM/output';
        // var outputCSVPath = './output/RequestForm_';
        outputCSVPath = outputCSVPath + 'requestForm_' + requestId + '_INQUEUE' + fileExtn;

        console.log({ outputCSVPath});        

        const csvData = csvjson.toCSV(fileContent, {
            headers: 'key'
        });
        writeFile(outputCSVPath, csvData, (err) => {
            if (err) {
                console.log(err);
                throw new Error(err);
            }
            console.log('Success!');
            res.send({
                success: true,
                message: successMessage
            });
        });
    });
});
module.exports = generateCSVRouter;
