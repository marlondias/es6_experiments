/*  Write a program that accepts one or more numbers as command-line arguments
and prints the sum of those numbers to the console (stdout). */

const args = process.argv.slice(2);

let sum = 0;

for(a of args){
  if(isFinite(a)){
    sum += 1*a;
  }
}

console.log(sum);
