/*jshint esversion: 6 */
// content of generate to CSV
const express = require('express');
const generateCSVRouter = express.Router();
const csvjson = require('csvjson');
const fs = require('fs');
const readFile = fs.readFile;
const writeFile = fs.writeFile;
const config = require('../config.js');
const requestDataPath = config.requestDataPath;
const outputCSVPath = config.outputCSVPath;

generateCSVRouter.post('/', (req, res) => {
    readFile(requestDataPath, 'utf-8', (err, fileContent) => {
        if (err) {
            console.log(err); 
            throw new Error(err);
        }
        const csvData = csvjson.toCSV(fileContent, {
            headers: 'key'
        });
        writeFile(outputCSVPath, csvData, (err) => {
            if (err) {
                console.log(err); 
                throw new Error(err);
            }
            console.log('Success!');
        });
    });
    // res.send('Success!');
});
module.exports = generateCSVRouter;
