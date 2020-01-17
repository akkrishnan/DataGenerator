/*jshint esversion: 6 */
const express = require('express');
const postUserContext = express.Router();
const getUserContext = express.Router();
const fs = require('fs');
const writeFile = fs.writeFile;
const config = require('../config.js');
const util = require('./util.js');
const userContextDataPath = './data/usercontext.json';

postUserContext.post('/', (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    console.log(requestBody.userName);
    console.log(util.encrypt(requestBody.userName));
    const responseJSON = {
        success: true,
        userDetails: {
            userName: util.encrypt(requestBody.userName),
            password: util.encrypt(requestBody.password),
            language: 'en'
        }
    }

    writeFile(userContextDataPath, JSON.stringify(responseJSON), (err) => {
        if (err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }
        console.log('Successfully updated the user context!');
    });

    res.send(responseJSON);
});

getUserContext.get('/', (req, res) => {
    fs.readFile(userContextDataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        // const userDetails = JSON.parse(data).userDetails;
        // const userName = userDetails.userName;
        res.send(JSON.parse(data));
    });
});

module.exports = {
    postUserContext: postUserContext,
    getUserContext: getUserContext
};