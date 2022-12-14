const fs = require("fs");

const lines = fs
  .readFileSync("day01.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  //.split(/\n\s*\n/) // split on newline
  .split("\n\n") // split by empty line
  //.filter(Boolean) // Remove empty lines
  .map((x) => x.split("\n")); // split each element by new line
  //.map(Number); // Parse each line into a number
  //.map(x => x.split(": ")); // Parse each line into an array

  //console.log(lines)


function part1(lines) {
  //for each elf, sum up calories
  let sums = lines.map(x => x.reduce((a, b) => parseInt(a) + parseInt(b), 0))
  //console.log(sums)

  // get max
  let max = Math.max(...sums)
  console.log(max)
}

//part1(lines);


function part2(lines) {
  //for each elf, sum up calories
  let sums = lines.map(x => x.reduce((a, b) => parseInt(a) + parseInt(b), 0))
  //console.log(sums)

  // sort
  sums.sort(function(a, b) {
    return b - a;
  });

  console.log(sums[0])
  console.log(sums[1])
  console.log(sums[2])
  console.log(sums[0]+sums[1]+sums[2])
  
}

part2(lines);