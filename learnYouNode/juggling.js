/*
This problem is similar to HTTP COLLECT, but this time you will be provided with
three URLs as the first three command-line arguments.
You must collect the complete content provided to you by each of the URLs and
print it to the console (stdout). You don't need to print out the length, just
the data as a String; one line per URL.
The catch is that you must print them out in the same order as the URLs are
provided to you as command-line arguments.
*/

const http = require('http');
const uObjs = [
  {url: process.argv[2], done: false, content: "" },
  {url: process.argv[3], done: false, content: "" },
  {url: process.argv[4], done: false, content: "" }
];

function logAllUrls(){
  let ready = true;
  for(let u of uObjs){ if(!u.done) ready = false; }
  if(ready){
    for(let u of uObjs){ console.log(u.content); }
  }
}

for(let u of uObjs){
  http.get(u.url, (response) => {
    response.setEncoding('utf8');
    response.on('error', console.error);

    const dataStream = [];
    response.on('data', (data) => {
      dataStream.push(data);
    });

    response.on('end', () => {
      dataStream.forEach((data) => {
        u.content += data;
      });
      u.done = true;
      logAllUrls();
    });
  }).on('error', console.error);
}
