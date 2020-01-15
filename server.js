/*jshint esversion: 6 */
const app = require('./app.js');
const debug = require('debug')('mean-app:server');
const http = require('http');
const port = normalizePort(process.env.PORT || '80');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
  var addr = server.address(); // server.address().port
  debug('Listening on ' + port + ' ' + addr);
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) { // named pipe
    return val;
  }
  if (port >= 0) { // port number
    return port;
  }
  return false;
}
