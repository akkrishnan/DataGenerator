/*jshint esversion: 6 */
// content of generateCSV.js

const csvjson = require('csvjson');
const fs = require('fs');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;
const dataPath = './data/test-data.json';
const outputPath = './output/test-data.csv';

exports.generateData = function (req, res) {
    readFile(dataPath, 'utf-8', (err, fileContent) => {
        if (err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }
        const csvData = csvjson.toCSV(fileContent, {
            headers: 'key'
        });
        writeFile(outputPath, csvData, (err) => {
            if (err) {
                console.log(err); // Do something to handle the error or just throw it
                throw new Error(err);
            }
            console.log('Success!');
        });
    });
    // res.send('Success!');
}

exports.getAllRequests = function (req, res) {
    console.log(dataPath);
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        // res.send(JSON.parse(data));
        return data;
    });
}
