/*
CALL A MODULE that prints a list of files in a given directory,
filtered by the extension of the files. The first argument is the
directory name and the second argument is the extension filter. Print the
list of files (one file per line) to the console. You must use
asynchronous I/O.
In the case of an error bubbling up to your original program file, simply
check for it and print an informative message to the console.
*/

const makeit = require('./makeIt-module.js');
const path = process.argv[2];
const extension = process.argv[3];

makeit(path, extension, (err, files) => {
  if(err){
    console.log('ERROR: Some nasty bug emerged!!');
    return;
  }
  for(f of files){ console.log(f); }
});
