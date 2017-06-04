/*
Write an HTTP server that serves JSON data when it receives a GET request to
the path '/api/parsetime' or 'api/unixtime'. Your server should listen on the
port provided by the first argument to your program.

For the '/api/parsetime', expect the request to contain a query string with a
key 'iso' and an ISO-format time as the value. The JSON response should contain
only 'hour', 'minute' and 'second' properties.

The path '/api/unixtime' expect the same query string but returns UNIX epoch
time in milliseconds under the property 'unixtime'.
*/

const http = require('http');
const url = require('url');
const routes = {
  parse: '/api/parsetime',
  unix: '/api/unixtime'
};
const port = process.argv[2];

const server = http.createServer((request, response) => {
  if(request.method != 'GET'){
    response.writeHead(405, { 'Content-Type': 'text/plain' });
    response.end('Sorry, only GET requests are allowed.');
    return;
  }
  urlInfo = url.parse(request.url, true);

  const date = (urlInfo.query) ? new Date(urlInfo.query.iso) : null;
  if(!date){
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.end('Sorry, the format of your query is invalid.');
    return;
  }

  const result = {};
  if(urlInfo.pathname == routes.parse){
    try{
      result.hour = date.getHours();
      result.minute = date.getMinutes();
      result.second = date.getSeconds();
    } catch(e){
      console.error('ERROR: ' + e);
    }
  }
  else if(urlInfo.pathname == routes.unix){
    try{
      result.unixtime = date.getTime();
    } catch(e){
      console.error('ERROR: ' + e);
    }
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(result));
});

server.listen(port);
