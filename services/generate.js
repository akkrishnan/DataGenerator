/*jshint esversion: 6 */
// content of generateCSV.js

const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;

exports.generateData = function (req, res) {
    readFile('./data/test-data.json', 'utf-8', (err, fileContent) => {
        if (err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }

        const csvData = csvjson.toCSV(fileContent, {
            headers: 'key'
        });
        writeFile('./output/test-data.csv', csvData, (err) => {
            if (err) {
                console.log(err); // Do something to handle the error or just throw it
                throw new Error(err);
            }
            console.log('Success!');
        });
    });
    // res.send('Success!');
}