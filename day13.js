const fs = require("fs");

const lines = fs
  .readFileSync("day13.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n\n") // split by empty line


function getInput(){
  //const input = lines.map((line) => line.split("\n")); // split each element by new line
  const input = lines.map(function(line){
      const [left, right] = line.split("\n");
      return {
        left: JSON.parse(left),
        right: JSON.parse(right)
      };
    });
  return input;
}

function compare(left, right){
    // run iterative comparison of left and right
    //console.log({left, right})

    // if both numbers
    if (typeof left === 'number' && typeof right === 'number'){
        if (left < right){
            return "right"
        } else if (right < left){
            return "wrong"
        } else {
            // check next part
            return "next"
        }
    }

    // if both lists
    if (typeof left === 'object' && typeof right === 'object'){
        let x = 0;
        let y = 0;
        while (x<left.length && y<right.length){
            let innerCheck = compare(left[x], right[y]);
            if (innerCheck != "next"){
                return innerCheck;
            } else {
                x++;
                y++
            }
        }
        // check for lenght diff
        if (left.length < right.length){
            return "right";
        } else if (left.length > right.length){
            return "wrong";
        } else {
            return "next"
        }
    }

    // if mixed type
    if (typeof left === 'number'){
        left = [left]
    }
    if (typeof right === 'number'){
        right = [right]
    }

    return compare(left, right);
}

function part1() {
  const input = getInput();
  //console.log(input)

  let orders = [];

  // for each line
  for (const pair of input){
    let order = compare(pair.left, pair.right)
    orders.push(order)
  }
  console.log(orders)

  // get indexes
  let indexes = orders.map((x,i) => [x,i])
  indexes = indexes.filter(obj => obj[0] === "right");
  indexes = indexes.map(([a,b]) => b+1);
  console.log(indexes)

  // sum total
  let total = indexes.reduce((a, b) => a + b, 0)
  console.log(total)
}

function getInput2(){
    //const input = lines.map((line) => line.split("\n")); // split each element by new line
    const input = lines.map(function(line){
        return line.split("\n");
      });
      
    let flat = input.flat();
    //console.log(flat)
    flat = flat.map((x) => JSON.parse(x))
    return flat
  }

function part2() {
  const input = getInput2();
  //console.log(input)

  // sort list
  const sorted = input.sort(function compareSort(a, b){
    //console.log({a, b})
    let check = compare(a, b)
    if (check === "right"){
        return -1
    } else {
        return 1
    }
  })
  console.log(sorted)

  // find divider packets
  // change to strings
  const sortedStr = sorted.map(x => JSON.stringify(x))
  console.log(sortedStr)

  //[[2]]
  const index2 = sortedStr.indexOf("[[2]]") + 1;

  //[[6]]
  const index6 = sortedStr.indexOf("[[6]]") + 1;

  console.log(index2*index6)


}

//part1();
part2();


/* Useful Stuff

let total = arr.reduce((a, b) => a + b, 0)
let overlap = a.filter(el => b.indexOf(el) !== -1);
let num = parseInt(str)
let numbers = Array.from(Array(sizeOfArray).keys()).map(x => x+startingNum);

*/

