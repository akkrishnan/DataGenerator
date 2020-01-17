/*jshint esversion: 6 */
const express = require('express');
const encrypt = express.Router();
const decrypt = express.Router();
const CryptoJS = require("crypto-js");
// const nonce = Math.round(Math.random() * 100000);
const privateKey = "$datagen$";

module.exports = {
    encrypt: function encrypt(sourceStr) {
        return CryptoJS.AES.encrypt(sourceStr, privateKey).toString();
    },
    decrypt: function decrypt(encrypted) {
        return CryptoJS.AES.decrypt(encrypted, privateKey).toString(CryptoJS.enc.Utf8);
    }
}