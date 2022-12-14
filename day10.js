const fs = require("fs");
const { createSecureContext } = require("tls");

const lines = fs
  .readFileSync("day10.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // split on newline
  .map((x) => x.split(" ")); // split each element by new line

  //console.log(lines)
  //console.log(lines.length)

function part1() {
  // set starting counters
  let xVal = 1;
  let cycle = 0;

  // create array to store xVals
  let xVals = [];
  // store value at 0 cycle
  xVals.push(xVal);

  // for each instruction
  for (let i=0; i<lines.length; i++){
    let line = lines[i];
    // if noop
    if (line[0] == 'noop'){
        // increase cycle
        cycle++;
        //store xVal
        xVals.push(xVal);

    } else {
        // addx instruction
        // increase cycle
        cycle++;
        // store xVal
        xVals.push(xVal);
        // increase cycle
        cycle++;
        // increment xVal
        xVal += parseInt(line[1]);
        // store xVal
        xVals.push(xVal);
    }
  }

  console.log(xVals)
  console.log(xVals.length)

  // get summary values
  const cycle20 = 20 * xVals[19];
  const cycle60 = 60 * xVals[59];
  const cycle100 = 100 * xVals[99];
  const cycle140 = 140 * xVals[139];
  const cycle180 = 180 * xVals[179];
  const cycle220 = 220 * xVals[219];

  const total = cycle20 + cycle60 + cycle100 + cycle140 + cycle180 + cycle220
  console.log({total})

}

//part1();


function part2() {
  // set starting counters
  let xVal = 1;
  let cycle = 0;

  // create array to store xVals
  let xVals = [];
  // store value at 0 cycle
  xVals.push(xVal);

  // for each instruction
  for (let i=0; i<lines.length; i++){
    let line = lines[i];
    // if noop
    if (line[0] == 'noop'){
        // increase cycle
        cycle++;
        //store xVal
        xVals.push(xVal);

    } else {
        // addx instruction
        // increase cycle
        cycle++;
        // store xVal
        xVals.push(xVal);
        // increase cycle
        cycle++;
        // increment xVal
        xVal += parseInt(line[1]);
        // store xVal
        xVals.push(xVal);
    }
  }

  console.log(xVals)
  console.log(xVals.length)

  // transform to viewer
  let image = xVals.map((value, index) => {
    let pos = index % 40;
    if (Math.abs(value-pos)<2){
        return '#'
    } else {
        return '.'
    }
  });
  
  console.log({image})

  // chunk image into blocks of 40
  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );
  const chunks = chunk(image,40);

  // turn chunks into strings
  const chunkstr = chunks.map(x => x.join(""));

  console.log(chunkstr)
}

part2();




/* Useful Stuff

let total = arr.reduce((a, b) => a + b, 0)
let overlap = a.filter(el => b.indexOf(el) !== -1);
let num = parseInt(str)
let numbers = Array.from(Array(sizeOfArray).keys()).map(x => x+startingNum);

*/

