/*
Write a program that uses a single asynchronous filesystem operation to read a
file and print the number of newlines it contains to the console (stdout),
similar to running cat file | wc -l.
The full path to the file will be provided as the first command-line argument.
*/

const fs = require('fs');
const path = process.argv[2];

const contents = fs.readFile(path, function(err, contents){
  if(err){
    console.log('Error occurred!');
    return;
  }
  const newLines = contents.toString().split('\n').length - 1;
  console.log(newLines);
});
