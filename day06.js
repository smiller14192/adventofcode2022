const fs = require("fs");

const input = fs
  .readFileSync("day06.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("");

  //console.log(input)


function part1() {
  // set start
  let i = 0;
  let j = i+13;
  let found = 0
  
  while (j <= input.length && found == 0){
    let quad = input.slice(i, j+1);
    if (duplicateCheck(quad) === false){
        found = 1;
    }
    i++
    j++
  }

  console.log(j)
}

part1();

function duplicateCheck(arr){
    // arr is an array of length 4
    // return true if there are duplicates
    // return false if the 4 elements are unique
    let hasDuplicates = arr.length !== new Set(arr).size;
    return hasDuplicates
}


function part2() {
  //do something here
}

//part2();




/* Useful Stuff

let total = arr.reduce((a, b) => a + b, 0)
let overlap = a.filter(el => b.indexOf(el) !== -1);
let num = parseInt(str)

*/