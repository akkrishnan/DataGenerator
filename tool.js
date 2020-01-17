/*jshint esversion: 6 */
const CryptoJS = require("crypto-js");
const sourceString = "Krish";
// const nonce = Math.round(Math.random() * 100000);
const privateKey = "datagen";
console.log({ sourceString});
var enc = CryptoJS.AES.encrypt(sourceString, privateKey).toString();
console.log(enc);
var dec = CryptoJS.AES.decrypt(enc, privateKey).toString(CryptoJS.enc.Utf8);
console.log(dec);
