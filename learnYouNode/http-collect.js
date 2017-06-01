/*
Write a program that performs an HTTP GET request to a URL provided to you
as the first command-line argument. Collect all data from the server (not
just the first "data" event) and then write two lines to the console
(stdout).
The first line you write should just be an integer representing the number
of characters received from the server. The second line should contain the
complete String of characters sent by the server.

HINT - Approach 1:
Collect data across multiple "data" events and append the results together
prior to printing the output. Use the "end" event to determine when the
stream is finished and you can write the output.
*/

const http = require('http');
const url = process.argv[2];

http.get(url, (response) => {
  response.setEncoding('utf8');
  response.on('error', console.error);

  const dataStream = [];
  response.on('data', (data) => {
    dataStream.push(data);
  });

  response.on('end', () => {
    try {
      let received = "";
      dataStream.forEach((data) => {
        received += data;
      });
      console.log(received.length);
      console.log(received);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', console.error);
