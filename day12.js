const fs = require("fs");

const lines = fs
  .readFileSync("day12.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // split on newline
  .filter(Boolean) // Remove empty lines

function getInput(){
  const res = {
    start: {},
    end: {},
    map: []
  }
  res.map = lines.map((line, row) => line.split("").map((value, col) => {
    if (value === "S"){
        res.start = {
            y: row,
            x: col
        }
        return 0;
    } 
    if (value === "E"){
        res.end = {
            y: row,
            x: col
        }
        return 25;
    }
    return value.charCodeAt(0)-"a".charCodeAt(0);
  }));
  
  //console.log(res)
  return res;
}

function pointToInt(x, y){
    return y * 1e3 + x;
}

function intToPoint(int){
    return {
        y: Math.floor(int/1e3),
        x: int % 1e3
    }
}

function dijkstra(map, start, end){
    const dist = {};
    const prev = {};
    let queue = [];
    // for each row
    for (let y=0;  y<map.length; y++){
        // for each column
        for (let x=0; x<map[y].length; x++){
            const id = pointToInt(x, y);
            dist[id] = Infinity;
            queue.push(id);
        }
    }
    dist[pointToInt(start.x, start.y)] = 0;

    while(queue.length > 0){
        let u = null;
        for (const current of queue){
            if(u === null || dist[current]<dist[u]){
                u = current;
            }
        }
        if(u === pointToInt(end.x, end.y)){
            break;
        }
        //queue = queue.remove(u);
        queue = queue.filter((x) => x != u);

        const point = intToPoint(u);

        // get neighbours
        const neighbours = getNeighbours(point.x,point.y,map)

        for (const v of neighbours){
            if(queue.indexOf(v)>-1){
                const alt = dist[u] + 1;
                if (alt<dist[v]){
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }
    }
    return {
        dist,
        prev
    };
}

function getNeighbours(x, y, map){
    let pointValue = map[y][x];
    let north = {y: y-1, x: x};
    let south = {y: y+1, x: x};
    let east = {y: y, x: x+1};
    let west = {y: y, x: x-1};
    let list = [north, south, east, west]
        .filter(({y, x, value}) => x>=0 && y>=0 && y<map.length && x<map[0].length && map[y][x]<=pointValue+1);
    const res = list.map(({y,x, value}) => pointToInt(x, y));
    return res;
}

function part1() {
  const heightmap = getInput();
  const data = dijkstra(heightmap.map, heightmap.start, heightmap.end)
  const distance = data.dist[pointToInt(heightmap.end.x, heightmap.end.y)]
  console.log(distance)
}


function getNeighbours2(x, y, map){
    let pointValue = map[y][x];
    let north = {y: y-1, x: x};
    let south = {y: y+1, x: x};
    let east = {y: y, x: x+1};
    let west = {y: y, x: x-1};
    let list = [north, south, east, west]
        .filter(({y, x, value}) => x>=0 && y>=0 && y<map.length && x<map[0].length && map[y][x]>=pointValue-1);
    const res = list.map(({y,x, value}) => pointToInt(x, y));
    return res;
}

function dijkstra2(map, start){
    const dist = {};
    const prev = {};
    let queue = [];
    // for each row
    for (let y=0;  y<map.length; y++){
        // for each column
        for (let x=0; x<map[y].length; x++){
            const id = pointToInt(x, y);
            dist[id] = Infinity;
            queue.push(id);
        }
    }
    dist[pointToInt(start.x, start.y)] = 0;

    while(queue.length > 0){
        let u = null;
        for (const current of queue){
            if(u === null || dist[current]<dist[u]){
                u = current;
            }
        }
        const p = intToPoint(u)
        if(map[p.y][p.x] === 0){
            return dist[u];
        }
        //queue = queue.remove(u);
        queue = queue.filter((x) => x != u);

        const point = intToPoint(u);

        // get neighbours
        const neighbours = getNeighbours2(point.x,point.y,map)

        for (const v of neighbours){
            if(queue.indexOf(v)>-1){
                const alt = dist[u] + 1;
                if (alt<dist[v]){
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }
    }
    return {
        dist,
        prev
    };
}



function part2() {
  const heightmap = getInput();
  const data = dijkstra2(heightmap.map, heightmap.end)
  //const distance = data.dist[pointToInt(heightmap.end.x, heightmap.end.y)]
  console.log(data)


}

//part1();
part2();


/* Useful Stuff

let total = arr.reduce((a, b) => a + b, 0)
let overlap = a.filter(el => b.indexOf(el) !== -1);
let num = parseInt(str)
let numbers = Array.from(Array(sizeOfArray).keys()).map(x => x+startingNum);

*/

