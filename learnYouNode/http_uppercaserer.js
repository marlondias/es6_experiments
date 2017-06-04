/*
Write an HTTP server that receives only POST requests and converts incoming
POST body characters to upper-case and returns it to the client.
Your server should listen on the port provided by the first argument.
*/

const http = require('http');
const t2map = require('through2-map');
const port = process.argv[2];

const server = http.createServer((request, response) => {
  if(request.method == 'POST'){
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    request.pipe(t2map((chunk) => {
      return chunk.toString().toUpperCase();
    })).pipe(response);
  }
  else{
    response.end('Only GET requests are accepted!');
  }
});

server.listen(port);
