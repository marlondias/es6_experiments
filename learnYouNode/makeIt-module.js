/*
These four things are the contract that your module must follow.
1. Export a single function that takes exactly the arguments described.
2. Call the callback exactly once with an error or some data as described.
3. Don't change anything else, like global variables or stdout.
4. Handle all the errors that may occur and pass them to the callback.

You must not print directly to the console from your module file, only
from your original program.
*/

const fs = require('fs');

module.exports = function(dir, targetExt, callback){
  fs.readdir(dir, (error, list) => {
    if(error){
      callback(error);
      return;
    }
    const newList = [];
    for(filename of list){
      let ext = filename.split('.');
      if(ext.length > 1) ext = ext.pop();
      else continue;
      if(ext === targetExt) newList.push(filename);
    }
    callback(undefined, newList);
  });
}
