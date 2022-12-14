const fs = require("fs");

const lines = fs
  .readFileSync("day08.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // split on newline
  .filter(Boolean) // Remove empty lines
  .map((x) => x.split("")); // split each element by new line

const treeMap = lines.map(function (nested) {
    return nested.map(function (element) {
        return parseInt(element);
    });
});

const rows = treeMap.length
const cols = treeMap[0].length

//console.log({rows, cols, treeMap})

function part1() {
  // Set tree count
  let treeCount = 0;

  // add edge trees
  treeCount += 2*(rows+cols) - 4

  // cycle through rows
  for (let i=1; i<rows-1; i++){
    // cycle through cols
    for (let j=1; j<cols-1; j++){
        let tree = treeMap[i][j];
        let sightlines = getSightLines(i, j);

        // filter list to trees shorter than selected tree
        sightlines = sightlines.filter(x => x<tree)
        if (sightlines.length > 0){
            treeCount ++
        }
    }
  }
  console.log({treeCount})
}

//part1();

function getSightLines(i, j){
    // i and j are values from 1 to row/col -1
    // return array 4, the max tree heigh in each direction
    let list = [];

    // get left
    let left = treeMap[i].slice(0,j);
    list.push(Math.max.apply(Math, left));

    // get right
    let right = treeMap[i].slice(j+1, cols);
    list.push(Math.max.apply(Math, right));

    // get vertical
    let vertical = treeMap.map(x => x[j]);
    let up = vertical.slice(0, i)
    let down = vertical.slice(i+1, rows);
    list.push(Math.max.apply(Math, up));
    list.push(Math.max.apply(Math, down));

    //console.log({list})
    return list

}


function part2() {
  // map each row of trees to its scenic score
  let scenicScores = [];

  // add first row
  let zeroRow = Array.from(Array(cols).keys()).map(x => 0);
  scenicScores.push(zeroRow);

  // cycle through rows
  for (let i=1; i<rows-1; i++){
    let j=i;
    let scenicScoreRow = treeMap[i].map((value, index, i) => getScenicScore(value, index, j))
    scenicScores.push(scenicScoreRow);
  }

  // add last row
  scenicScores.push(zeroRow);
  //console.log(scenicScores)

  // map each row to it's max
  let maxInRow = scenicScores.map((arr) => Math.max.apply(Math, arr))

  let max = Math.max.apply(Math, maxInRow)

  console.log({max})
  
}

part2();

function getScenicScore(tree, col, row){
    //console.log({tree, row, col})

    // if on left or right edge
    if (col == 0 || col == cols-1){
        return 0
    }

    // count left
    let left = treeMap[row].slice(0,col).reverse();
    let leftCount = countVisable(tree, left);

    // count right
    let right = treeMap[row].slice(col+1,cols);
    let rightCount = countVisable(tree, right);

    // get vertical
    let vertical = treeMap.map(x => x[col]);

    // count up
    let up = vertical.slice(0, row).reverse();
    let upCount = countVisable(tree, up);    

    // count down
    let down = vertical.slice(row+1, rows);
    let downCount = countVisable(tree, down);

    //console.log({left,right,up,down})
    //console.log({leftCount,rightCount,upCount,downCount})
    //console.log(leftCount*rightCount*upCount*downCount)
    return leftCount*rightCount*upCount*downCount  

}

function countVisable(num, arr){
    // traverse array until end or entry is => num
    //console.log({num, arr})
    let count = 0;
    for (let k=0; k<arr.length; k++){
        count++
        //console.log({k})
        if(arr[k] >= num){
            //console.log('stop here')
            break;
        }
        //console.log('add to count')
    }
    return count;
}