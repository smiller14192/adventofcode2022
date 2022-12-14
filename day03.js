const fs = require("fs");

const lines = fs
  .readFileSync("day03.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // split on newline
  .filter(Boolean) // Remove empty lines
  //.map(x => halves(x)); // Parse each line into an array of halves

  //console.log(lines)
  //console.log(lines.length)

function halves(str){
    let len = str.length;
    let halfLen = len/2;
    let part1 = str.slice(0,halfLen);
    let part2 = str.slice(halfLen);
    return [part1.split(""), part2.split("")]
}

function part1() {
  // change lines to halves
  let lineHalves = lines.map(x => halves(x));

  // for each line get duplicate character
  let characters = lineHalves.map(([a,b]) => getDuplicate(a,b));
  console.log({characters})

  // turn characters to priorities
  let priorities = characters.map(x => getPriority(x));
  console.log({priorities})

  let total = priorities.reduce((a, b) => a + b, 0)
  console.log({total})
}

//part1();

function getDuplicate(a,b){
    //let a = x[0];
    //let b = x[1];
    // a and b are two arrays of equal length
    // return character that appears in both
    let char = a.filter(el => b.indexOf(el) !== -1);
    return char[0]
}

function getPriority(x){
    // x is a case sensitive letter of the alphabet
    // return relevant priority value where a-z is 1-26 and A-Z is 27-52
    let num = 0;

    // if upper case
    if (x === x.toUpperCase()){ 
        num = x.charCodeAt(0)-64+26; 
    } else { 
        num = x.charCodeAt(0)-96;
    }
    return num
}


function part2() {
  // split lines into groups of 3
  let trios = []
  const chunkSize = 3;
  for (let i = 0; i < lines.length; i += chunkSize) {
    let chunk = lines.slice(i, i + chunkSize);
    chunk = chunk.map(x => x.split(""))
    trios.push(chunk)
  }
  //console.log(trios)

  // for each group, get badges
  let badges = trios.map(([a,b,c]) => getDuplicate2(a,b,c));
  console.log({badges})

  // turn badges to priorities
  let priorities = badges.map(x => getPriority(x));
  console.log({priorities})

  let total = priorities.reduce((a, b) => a + b, 0)
  console.log({total})

}

part2();

function getDuplicate2(a,b,c){
    // a, b and c are three arrays of potentially different lengths
    // return character that appears in both
    let char = a.filter(el => b.indexOf(el) !== -1).filter(el => c.indexOf(el) !== -1);
    return char[0]
}