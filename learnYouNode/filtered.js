/*
Create a program that prints a list of files in a given directory,
filtered by the extension of the files. You will be provided a directory
name as the first argument to your program (e.g. '/path/to/dir/') and a
file extension to filter by as the second argument.

For example, if you get 'txt' as the second argument then you will need to
filter the list to only files that end with .txt. Note that the second
argument will not come prefixed with a '.'.

Keep in mind that the first arguments of your program are not the first
values of the process.argv array, as the first two values are reserved for
system info by Node.

The list of files should be printed to the console, one file per line. You
must use asynchronous I/O.
*/

const fs = require('fs');
const path = process.argv[2];
const extension = process.argv[3];

fs.readdir(path, (err, list) => {
  if(err){
    console.log('Error reading directory!');
    return;
  }

  const output = [];

  for(filename of list){
    let ext = filename.split('.');
    if(ext.length > 1) ext = ext.pop();
    else continue;

    if(ext === extension) output.push(filename);
  }

  for(o of output){ console.log(o); }
});
