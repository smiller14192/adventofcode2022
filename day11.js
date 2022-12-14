const fs = require("fs");
const { listeners } = require("process");

const lines = fs
  .readFileSync("day11.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n\n") // split by empty line
  .map((x) => x.split("\n")); // split each element by new line

  //console.log(lines)

class Monkey {
    constructor(line){
        // line is array of length 6
        this.name = line[0].split(" ")[1].replace(":","");
        this.items = line[1].replace("  Starting items: ","").split(", ");
        this.operation = line[2].replace("  Operation: new = old ","").split(" ")[0]; // get either * or +
        this.factor = parseInt(line[2].split(" ").slice(-1)[0]);
        if (isNaN(this.factor)){ this.factor = 'self'};
        this.divisor = parseInt(line[3].split(" ").slice(-1)[0]);
        this.resultTrue = parseInt(line[4].split(" ").slice(-1)[0]);
        this.resultFalse = parseInt(line[5].split(" ").slice(-1)[0]);
        this.inspected = 0;
    }

    addItem(item){
        this.items.push(item);
    }

    removeItem(item){
        //console.log('removing items')
        //console.log('monkey',this.name)
        //console.log('item',item)
        const index = this.items.indexOf(item);
        if (index > -1) { // only splice array when item is found
            this.items.splice(index, 1); // 2nd parameter means remove one item only
        }       
    }
}


function part1() {
  // build monkeys
  let monkeys = [];
  // for each monkey
  for (let i=0; i<lines.length; i++){
    let currentMonkey = new Monkey(lines[i]);
    // add to array
    monkeys.push(currentMonkey)
  }
  //console.log({monkeys})

  const rounds = 20;
  // for each round
  for (let round = 1; round <= rounds; round++){
    console.log({round})
    // for each monkey
    for (let k=0; k<monkeys.length; k++){
        console.log('monkey ', k)
        // get current monkey & items
        let monkey = monkeys[k];
        //console.log({monkey})
        let items = monkey.items;
        // for each item
        while (items.length>0){
            let item = parseInt(items[0]);
            let itemOG = item;
            //console.log({item, itemOG})
            // get factor
            let factorNum = monkey.factor
            if(factorNum == 'self'){factorNum = item};
            // apply opteration
            if(monkey.operation == "*"){
                item = item*factorNum
            } else {
                item = item + factorNum
            }
            //console.log('applied opperation', item)
            // apply boredom
            item = Math.floor(item/3);
            //console.log('applied boredom', item)
            // inspect
            monkeys[k].inspected++
            let catcher = 0
            if ((item % parseInt(monkey.divisor)) == 0) {
                // true
                //console.log('divisable by', monkey.divisor)
                catcher = monkey.resultTrue
            } else {
                // false
                //console.log('not divisable by', monkey.divisor)
                catcher = monkey.resultFalse
            }
            // throw item
            //console.log('throwing to', catcher)
            monkeys[catcher].addItem(item.toString());
            monkeys[k].removeItem(itemOG.toString())
            // next item 
        }
    }
    //console.log({monkeys})
  }
  //console.log(monkeys)

  // get instected values
  let inspected = monkeys.map(x => x.inspected)
  console.log(inspected)
}

//part1();


function part2() {
    // build monkeys
    let monkeys = [];
    // for each monkey
    for (let i=0; i<lines.length; i++){
      let currentMonkey = new Monkey(lines[i]);
      // add to array
      monkeys.push(currentMonkey)
    }
    //console.log({monkeys})
  
    const rounds = 10000;
    // for each round
    for (let round = 1; round <= rounds; round++){
      //console.log({round})
      // for each monkey
      for (let k=0; k<monkeys.length; k++){
          //console.log('monkey ', k)
          // get current monkey & items
          let monkey = monkeys[k];
          //console.log({monkey})
          let items = monkey.items;
          // for each item
          while (items.length>0){
              let item = parseInt(items[0]);
              let itemOG = item;
              //console.log({item, itemOG})
              // get factor
              let factorNum = monkey.factor
              if(factorNum == 'self'){factorNum = item};
              // apply opteration
              if(monkey.operation == "*"){
                  item = item*factorNum
              } else {
                  item = item + factorNum
              }
              //console.log('applied opperation', item)
              // apply boredom
              //item = Math.floor(item/3);
              //console.log('applied boredom', item)
              // inspect
              monkeys[k].inspected++
              let catcher = 0
              if ((item % parseInt(monkey.divisor)) == 0) {
                  // true
                  //console.log('divisable by', monkey.divisor)
                  catcher = monkey.resultTrue
              } else {
                  // false
                  //console.log('not divisable by', monkey.divisor)
                  catcher = monkey.resultFalse
              }

              // reduce item
              //item = item % 96577;
              item = item % 9699690;
              // throw item
              //console.log('throwing to', catcher)
              monkeys[catcher].addItem(item.toString());
              monkeys[k].removeItem(itemOG.toString())
              // next item 
          }
      }
      //console.log({monkeys})
    }
    //console.log(monkeys)
  
    // get instected values
    let inspected = monkeys.map(x => x.inspected)
    console.log(inspected)
  }

part2();




/* Useful Stuff

let total = arr.reduce((a, b) => a + b, 0)
let overlap = a.filter(el => b.indexOf(el) !== -1);
let num = parseInt(str)
let numbers = Array.from(Array(sizeOfArray).keys()).map(x => x+startingNum);

*/

