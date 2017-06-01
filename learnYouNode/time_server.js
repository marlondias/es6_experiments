/*
Write a TCP time server!
Your server should listen to TCP connections on the port provided by the first
argument to your program. For each connection you must write the current date
and time (24 hour). After sending the string, close the connection.

The string must be in the format: "YYYY-MM-DD hh:mm" followed by a newline char.
Month, day, hour and minute must be zero-filled to 2 integers. For example:
"2013-07-06 17:42"
*/

const net = require('net');
const port = process.argv[2];

function zeroFill(value){
  return (value < 10) ? '0'+value : value;
}

const server = net.createServer((socket) => {
  const dt = new Date();
  const timeStamp = dt.getFullYear() + '-'
  +zeroFill(dt.getMonth()+1) + '-'
  +zeroFill(dt.getDate()) + ' '
  +zeroFill(dt.getHours()) + ':'
  +zeroFill(dt.getMinutes()) + '\n';
  socket.end(timeStamp);
});

server.listen(port);
