const fs = require("fs");

const lines = fs
  .readFileSync("day14.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // split on newline
  .filter(Boolean) // Remove empty lines

function getInput(){
  let input = lines.map((line) => line.split(" -> ").map(function (pair){
    return {
        x: parseInt(pair.split(",")[0]),
        y: parseInt(pair.split(",")[1])
    }
  }))
  //console.log({input})

  let points = [];

  // for each row
  for (let row=0; row<input.length; row++){
    // for each point in row
    for (let p=0; p<input[row].length-1; p++){
      let start = input[row][p];
      let end = input[row][p+1]
      let fill = getList(start, end);
      fill.forEach(function(item){points.push(item)});
    }
  }

  //console.log(points)
  return points;
}

function getList(st, en){
    //console.log({st, en})
    // st and en are objects in the form {x, y};
    // return array of points between st and en
    let points = []
    // if x value equal
    if (st.x === en.x){
      const size = Math.abs(st.y - en.y)+1;
      const list = Array.from({length: size}, (_, index) => index + Math.min(st.y, en.y));
      points = list.map(function (q) {
        return new Point(st.x, q)
      })
    }
    // if y value equal
    if (st.y === en.y){
      const size = Math.abs(st.x - en.x)+1;
      const list = Array.from({length: size}, (_, index) => index + Math.min(st.x, en.x));
      points = list.map(function (q) {
        return new Point(q, st.y)
      })
    }
    //console.log(points)
    return points    
}

class Point{
    constructor (x, y){
        this.x = x;
        this.y = y;
    }

    down(a){
        this.y = this.y+a;
        return this
    }

    left(a){
        this.x = this.x-a;
    }

    right(a){
        this.x = this.x+a;
    }
}

function pointToStr(point){
    return point.x+"-"+point.y
}

function strToPoint(str){
    return new Point(parseInt(str.split("-")[0]), parseInt(str.split("-")[0]))
}

function part1() {
  // build map
  const caveMap = getInput();

  // get lowest Y value
  let caveMapYMax = 0
  caveMap.forEach(function(point) {
    caveMapYMax = Math.max(caveMapYMax, point.y);
  })

  // build map as strings for comparison
  const caveMapStr = caveMap.map((item) => pointToStr(item))

  // set up counter
  let sandCount = 0;

  // set up start position
  const start = new Point(500,0);

  // set up current position
  let position = start

  // while position is above lowest point
  while (position.y < caveMapYMax){
    // position is start
    position = new Point(500, 0);
    // can move is true
    let canMove = true;
    // release sand
    sandCount ++

    while(canMove && position.y<caveMapYMax){
        //console.log({sandCount})
        // move down
        position.down(1);
        //console.log("trying position", {position})

        // check free
        if (caveMapStr.indexOf(pointToStr(position)) < 0){
            // space free
            //console.log("space free", {position})
            // continue moving down
            //console.log("move down")
            continue;
        } else {
            // try down left
            position.left(1);
            if(caveMapStr.indexOf(pointToStr(position)) < 0){
                // space free
                //console.log("space free", {position})
                // continue moving down
                //console.log("move down left")
                continue;
            } else {
                // try down right
                position.right(2); // moving 2 to accomodate left move
                if(caveMapStr.indexOf(pointToStr(position)) < 0){
                    // space free
                    //console.log("space free", {position})
                    // continue moving down
                    //console.log("move down right")
                    continue;
                } else {
                    // cannot move
                    //console.log("space not free", {position})
                    // store prev position as now blocked
                    position.down(-1);
                    position.left(1);
                    //console.log({position})
                    //console.log("store position at", {position})
                    caveMapStr.push(pointToStr(position))
                    // change can move value
                    canMove = false
                }
            }
        }  
    }
  }

  //console.log({sandCount})
  //console.log({caveMapStr})
  console.log(sandCount)
  //do something here
}

function part2() {
    // build map
    const caveMap = getInput();
  
    // get lowest Y value
    let caveMapYMax = 0
    caveMap.forEach(function(point) {
      caveMapYMax = Math.max(caveMapYMax, point.y);
    })

    // define floor
    let floor = caveMapYMax + 2;
  
    // build map as strings for comparison
    const caveMapStr = caveMap.map((item) => pointToStr(item))
  
    // set up counter
    let sandCount = 0;
  
    // set up start position
    const start = new Point(500,0);
  
    // set up current position
    let position = start
  
    // while sart point not blocked
    while (caveMapStr.indexOf(pointToStr(start)) < 0){
      // position is start
      position = new Point(500, -1);
      // can move is true
      let canMove = true;
      // release sand
      sandCount ++
  
      while(canMove && caveMapStr.indexOf(pointToStr(start)) < 0){
          //console.log({sandCount})
          // move down
          position.down(1);
          //console.log("trying position", {position})
  
          // check free
          if (caveMapStr.indexOf(pointToStr(position)) < 0 && position.y < floor){
              // space free
              //console.log("space free", {position})
              // continue moving down
              //console.log("move down")
              continue;
          } else {
              // try down left
              position.left(1);
              if(caveMapStr.indexOf(pointToStr(position)) < 0 && position.y < floor){
                  // space free
                  //console.log("space free", {position})
                  // continue moving down
                  //console.log("move down left")
                  continue;
              } else {
                  // try down right
                  position.right(2); // moving 2 to accomodate left move
                  if(caveMapStr.indexOf(pointToStr(position)) < 0 && position.y < floor){
                      // space free
                      //console.log("space free", {position})
                      // continue moving down
                      //console.log("move down right")
                      continue;
                  } else {
                      // cannot move
                      //console.log("space not free", {position})
                      // store prev position as now blocked
                      position.down(-1);
                      position.left(1);
                      //console.log({position})
                      //console.log("store position at", {position})
                      caveMapStr.push(pointToStr(position))
                      // change can move value
                      canMove = false
                  }
              }
          }  
      }
    }
  
    //console.log({sandCount})
    //console.log({caveMapStr})
    console.log(sandCount)
    //do something here
  }

//part1();
part2();


/* Useful Stuff

let total = arr.reduce((a, b) => a + b, 0)
let overlap = a.filter(el => b.indexOf(el) !== -1);
let num = parseInt(str)
let numbers = Array.from(Array(sizeOfArray).keys()).map(x => x+startingNum);

*/

