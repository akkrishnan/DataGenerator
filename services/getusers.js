/*jshint esversion: 8 */
const mongoose = require('mongoose');
const express = require('express');
const mongoURI = "mongodb://localhost:27017/networkanalytics"; //connecting to networkanalytics
const options = {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useUnifiedTopology: true,
  useNewUrlParser: true
};
const getAllUsers = express.Router();
const getUserById = express.Router();

mongoose.connect(mongoURI, options);

const UsersModel = mongoose.model("users", {});

getAllUsers.get('/', async (req, res) => {
  try {
    var result = await UsersModel.find().exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

getUserById.get('/', async (req, res) => {
  try {
    // var result = await UsersModel.find({
    //   name: parsePathVariable(req.baseUrl)
    // }).exec();
    var result = await UsersModel.aggregate([
      {
        $match: {
          name: parsePathVariable(req.baseUrl)
        }
      },
      {
        $lookup:
        {
          localField: 'role',
          from: 'roles',
          foreignField: 'key',
          as: 'roleId'
        }
      }
    ]);
    if (Object.keys(result).length === 0) {
      result = {};
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

parsePathVariable = (param) => {
  url = param.split('/');
  url = url[url.length - 1];
  return url;
};

module.exports = {
  getAllUsers,
  getUserById
};
