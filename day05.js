const { Console } = require("console");
const fs = require("fs");

const lines = fs
  .readFileSync("day05.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n\n") // split by empty line

  let start = lines[0];
  let instructions = lines[1].split("\n");

  // transtlate start to stacks
  const stacksRaw = start
        .split("\n")
        .map((line) => [... line].filter((value, index) => index % 4 == 1));
    
  // output stack numbers
  const stackNums = stacksRaw.pop()

  // define stacks
  let stacks = {};
  // for each stackNums
  for (const line of stacksRaw){
    for (let i=0; i < stackNums.length; i++){
        if (line[i] != " ") {
            // create stack if doesn't exist
            if(!stacks[stackNums[i]]) {
                stacks[stackNums[i]] = [];
            }
            stacks[stackNums[i]].unshift(line[i]);
        }
    }
  }

  // translate instructions into move objects
  const moves = instructions.map((x) => {
    const num = x.split(' ');
    return {
      count: parseInt(num[1]),
      from: parseInt(num[3]),
      to: parseInt(num[num.length - 1])
    }
  })

  //console.log({stacks}, {moves});

function part1() {
  // for each move
  for (let j=0; j<moves.length; j++){
    let move = moves[j]
    for (let i = 1; i<=move.count; i++){
        // get element to move
        let el = stacks[move.from].pop();
        // add to new stack
        stacks[move.to].push(el);
    }
    //console.log({stacks})
  }
  console.log({stacks})
  //console.log(Object.keys(stacks).length)

  // get a list of the top box on each stack
  let top = []
  for (let k=1; k<=Object.keys(stacks).length; k++){
    top.push(stacks[k].pop())
  }

  console.log(top.join(""));

}

//part1();


function part2() {
  // for each move
  for (let j=0; j<moves.length; j++){
    let move = moves[j]
    // get element(s) to move
    let el = stacks[move.from].slice(-1*move.count);
    // add to new stack
    stacks[move.to] = stacks[move.to].concat(el);
    // remove from old stack
    stacks[move.from].splice(-1*move.count, move.count);
  }
  console.log({stacks})
  
  // get a list of the top box on each stack
  let top = []
  for (let k=1; k<=Object.keys(stacks).length; k++){
    top.push(stacks[k].pop())
  }

  console.log(top.join(""));

}

part2();

