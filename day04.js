const fs = require("fs");

const lines = fs
  .readFileSync("day04.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // split on newline
  .filter(Boolean) // Remove empty lines
  //.map(x => x.split(",")); // Parse each line into an array
  .map(x => decodeLines(x)); // Parse each line into two arrays of pairs

  //console.log(lines)

function decodeLines(x){
    // take in string '2-4,6-8'
    // return array of arrays [[2, 4], [6, 8]]
    let arr = x.split(",").map(y => y.split("-"));
    return arr
}

function part1() {
  // for each line, check for full containment
  let checks = lines.map(([a,b]) => checkContainment(a,b));
  console.log({checks})

  let total = checks.reduce((a, b) => a + b, 0)
  console.log({total})
}

//part1();

function checkContainment(a, b){
    // a and b are two arrays with 2 elements, a min and max
    // translate to sizes
    let sizeA = a[1] - a[0] + 1
    let sizeB = b[1] - b[0] + 1

    let big = [];
    let small = [];

    // define big and small
    if (sizeA > sizeB){
        big = a;
        small = b;
    } else {
        big = b;
        small = a;
    }

    let output = 0;
    // check for containment
    if (parseInt(small[0]) >= parseInt(big[0]) && parseInt(small[1]) <= parseInt(big[1])){
        output = 1;
    }

    return output
}


function part2() {
  // for each line, check for overlap
  let checks = lines.map(([a,b]) => checkOverlap(a,b));
  //console.log({checks})

  let total = checks.reduce((a, b) => a + b, 0)
  console.log({total})
}

part2();

function checkOverlap(a,b){
    // a and b are two arrays with 2 elements, a min and max

    // translate to sizes
    let sizeA = parseInt(a[1]) - parseInt(a[0]) + 1;
    let sizeB = parseInt(b[1]) - parseInt(b[0]) + 1;

    // turn into full lists
    let listA = Array.from(Array(sizeA).keys()).map(x => x+parseInt(a[0]));
    let listB = Array.from(Array(sizeB).keys()).map(x => x+parseInt(b[0]));

    // check for overlap
    let overlap = listA.filter(el => listB.indexOf(el) !== -1);
    

    let output = 0;
    if (overlap.length > 0){
        output = 1
    }

    return output
}