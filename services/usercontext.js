/*jshint esversion: 8 */
const express = require('express');
const config = require('./config');
const util = require('./util');
const fs = require('fs');
const request = require('request');
const writeFile = fs.writeFile;
const readFile = fs.readFile;
const userContextDataPath = config.userContextDataPath();
const postUserContext = express.Router();
const getUserContext = express.Router();
const getUserID = express.Router();

postUserContext.post('/', (req, res) => {
  const requestBody = req.body;
  var responseJSON = {
    success: false,
    message: "Invalid User Credentials"
  };
  //   console.log(requestBody);
  //   console.log(requestBody.userName);
  //   console.log(util.encrypt(requestBody.userName));
  passwd = Buffer.from(requestBody.password, 'base64').toString('ascii');

  console.log(requestBody.userName);
  console.log(passwd);

  const getUserByIdUrlPath = config.getUserByIdPath() + requestBody.userName;
  console.log(getUserByIdUrlPath);

  request(getUserByIdUrlPath, function (error, response, data) {
    if (!error) {
      if (Object.keys(JSON.parse(data)).length > 0) {
        console.log('========== CALLED API');
        console.log(requestBody.password);
        console.log(data);
        console.log(JSON.parse(data)[0].password);
        parsedData = JSON.parse(data)[0];
        console.log('========== CALLED API');
        if (requestBody.password === JSON.parse(data)[0].password) {
          responseJSON = {
            success: true,
            userDetails: {
              userName: util.encrypt(requestBody.userName),
              password: Buffer.from(passwd).toString('base64'),
              email: parsedData.email,
              role: parsedData.role,
              roleId: parsedData.roleId[0].roleId,
              language: 'en'
            }
          };

          writeFile(userContextDataPath, JSON.stringify(responseJSON), (err) => {
            if (err) {
              console.log(err); // Do something to handle the error or just throw it
              throw new Error(err);
            }
            console.log('Successfully updated the user context!');
          });
        }
      }
      res.send(responseJSON);
    } else {
      res.send(responseJSON);
    }
  });
});

getUserContext.get('/', (req, res) => {
  readFile(userContextDataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});


getUserID.get('/', (req, res) => {
  readFile(userContextDataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const userDetails = JSON.parse(data).userDetails;
    const responseData = {
      userName: util.decrypt(userDetails.userName)
    };
    res.send(responseData);
  });
});

module.exports = {
  postUserContext,
  getUserContext,
  getUserID
};
