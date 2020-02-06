/*jshint esversion: 6 */
const userContextDataPath = './data/usercontext.json';
const topReqDataPath = './data/toprequests.json';
const requestDataPath = './data/requestData.json';
const outputCSVPath = './output/';
const fontFamily = 'Lato';
const startupStyle = 'font-family:' + fontFamily + '; color: #284770; font-weight:600;';
const notFoundStyle = 'font-family:' + fontFamily + '; color:red; font-weight:600;';
const startupMessage = '<h1><span style="' + startupStyle + '">Welcome to Infinite Data Management Platform</span></h1>';
const notFoundMessage = '<h1><span style="' + startupStyle + '">Infinite Data Management Platform</span></h1><br /><h3><span style="' + notFoundStyle + '">Sorry! The URL that you request is not a valid one.</span></h3>';

module.exports = {
  userContextDataPath: () => userContextDataPath,
  topReqDataPath: () => topReqDataPath,
  requestDataPath: () => requestDataPath,
  outputCSVPath: () => outputCSVPath,
  startupMessage: () => startupMessage,
  notFoundMessage: () => notFoundMessage
};
