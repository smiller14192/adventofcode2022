const fs = require("fs");
const { moveMessagePortToContext } = require("worker_threads");

const lines = fs
  .readFileSync("day09.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // split on newline
  .filter(Boolean) // Remove empty lines
  .map(x => x.split(" ")); // Parse each line into an array

  //console.log(lines)

// Change lines into full list of instuctions
const HMoves = lines.map(([dir, num]) => Array.from(Array(parseInt(num)).keys()).map(x => dir)).flat()

console.log('H move count =',HMoves.length)

function part1() {
  // set starting pos
  let posH = {
    x: 0,
    y: 0,
  };
  let posT = {
    x: 0,
    y: 0,
  };

  // keep track of all positions T moves though
  let tailPositions = [];
  // save starting position
  tailPositions.push([posT.x, posT.y]);

  // run each instructions
  for (let i=0; i<HMoves.length; i++){
    //console.log({i}, HMoves[i])
    // move H
    posH = moveHead(posH, HMoves[i]);
    //console.log({posH})

    // check for T move
    let TMoveCheck = checkMove(posH, posT)
    //console.log({TMoveCheck})

    if (TMoveCheck == true){
        // move T
        posT = moveTail(posH, posT);
        //console.log({posT})

        // store new T position
        tailPositions.push([posT.x, posT.y]);
    }
  }

  // Get unique tail positions
  let tailPositionsStrings = tailPositions.map(pos => pos[0] + '-' + pos[1])
  let tailPositionsUnique = [... new Set(tailPositionsStrings)];
  //console.log(tailPositionsUnique)

  // Log tailPositions length
  console.log(tailPositionsUnique.length)
}

//part1();

function moveHead(position, direction){
    // position is an object of coordinates
    // direction is one of R, U, L, D
    switch(direction) {
        case 'R':
          position.x = position.x + 1
          break;
        case 'L':
          position.x = position.x - 1
          break;
        case 'U':
          position.y = position.y + 1
          break;
        case 'D':
          position.y = position.y + -1
          break;
        }    
    return position
}

function checkMove(posA, posB){
    // posA and posB are objects of coordiates
    // return true if positions are NOT touching
    if (Math.abs(posA.x - posB.x) > 1){
        return true
    }
    if (Math.abs(posA.y - posB.y) > 1){
        return true
    }
    return false
}

function moveTail(posA, posB){
    // posA and posB are objects of coordiates
    // return new value of posB to get closer to posA
    
    if (posA.y == posB.y){  // if same row
        //console.log('moving tail horizontally')
        posB.x = (posA.x + posB.x)/2
    } else if(posA.x == posB.x){  // if same col
        posB.y = (posA.y + posB.y)/2
        //console.log('moving tail vertically')
    } else {  // diagonal
        //console.log('moving tail diagonally')
        posB.x = posB.x + Math.sign(posA.x-posB.x)
        posB.y = posB.y + Math.sign(posA.y-posB.y)
    }

    return posB   
}


function part2() {
  // set starting pos
  let posH = {
    x: 0,
    y: 0,
  };
  let pos1 = {
    x: 0,
    y: 0,
  };
  let pos2 = {
    x: 0,
    y: 0,
  };
  let pos3 = {
    x: 0,
    y: 0,
  };
  let pos4 = {
    x: 0,
    y: 0,
  };
  let pos5 = {
    x: 0,
    y: 0,
  };
  let pos6 = {
    x: 0,
    y: 0,
  };
  let pos7 = {
    x: 0,
    y: 0,
  };
  let pos8 = {
    x: 0,
    y: 0,
  };
  let posT = {
    x: 0,
    y: 0,
  };

  // keep track of all positions T moves though
  let tailPositions = [];
  // save starting position
  tailPositions.push([posT.x, posT.y]);

  // run each instructions
  for (let i=0; i<HMoves.length; i++){
    // move H
    posH = moveHead(posH, HMoves[i]);

    // move 1
    pos1 = moveRope(posH, pos1);

    // move 2
    pos2 = moveRope(pos1, pos2);

    // move 1
    pos3 = moveRope(pos2, pos3);

    // move 2
    pos4 = moveRope(pos3, pos4);

    // move 1
    pos5 = moveRope(pos4, pos5);

    // move 2
    pos6 = moveRope(pos5, pos6);

    // move 1
    pos7 = moveRope(pos6, pos7);

    // move 2
    pos8 = moveRope(pos7, pos8);

    // move 2
    posT = moveRope(pos8, posT);

    // store new T position
    tailPositions.push([posT.x, posT.y]);

    //console.log({posH,pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8,posT})
  }

  // Get unique tail positions
  let tailPositionsStrings = tailPositions.map(pos => pos[0] + '-' + pos[1])
  let tailPositionsUnique = [... new Set(tailPositionsStrings)];
  //console.log(tailPositionsUnique)

  // Log tailPositions length
  console.log(tailPositionsUnique.length)

}

part2();


function moveRope(posA, posB){
    // posA and posB are objects of coordiates
    // return new value of posB to get closer to posA

    // check if posB needs to move
    let check = false;
    if (Math.abs(posA.x - posB.x) > 1){
        check = true;
    }
    if (Math.abs(posA.y - posB.y) > 1){
        check = true;
    }
    
    if(check == false){
        return posB;
    }
    
    if (posA.y == posB.y){  // if same row
        //console.log('moving tail horizontally')
        posB.x = (posA.x + posB.x)/2
    } else if(posA.x == posB.x){  // if same col
        posB.y = (posA.y + posB.y)/2
        //console.log('moving tail vertically')
    } else {  // diagonal
        //console.log('moving tail diagonally')
        posB.x = posB.x + Math.sign(posA.x-posB.x)
        posB.y = posB.y + Math.sign(posA.y-posB.y)
    }

    return posB   
}




/* Useful Stuff

let total = arr.reduce((a, b) => a + b, 0)
let overlap = a.filter(el => b.indexOf(el) !== -1);
let num = parseInt(str)
let numbers = Array.from(Array(sizeOfArray).keys()).map(x => x+startingNum);

*/

