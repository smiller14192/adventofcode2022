const fs = require("fs");

const lines = fs
  .readFileSync("day07.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // split on newline
  .filter(Boolean) // Remove empty lines

  //console.log(lines)

function createTree(lines) {
  // parse lines to build nested object
  const tree = {
    name: '/',
    isDirectory: true,
    children: [],
  }; // node: name, isDirectory, size, children, parent

  let currentNode = tree;
  let currentCommand = null;

  for (const line of lines){
    //console.log({line})
    if (line[0] == "$"){
        //console.log("running command")
        // command
        if (line[2] == "c"){
            // change directory
            let target = line.split(" ")[2]
            if (target == "/"){
                currentNode = tree
            } else if (target == ".."){
                // move out one level
                currentNode = currentNode.parent;
            } else {
                // move in one level
                //console.log('move to child dir', {target})
                currentNode = currentNode.children.find(
                    (folder) => folder.isDirectory && folder.name === target
                    );
            }
            //console.log('moved to folder:', currentNode)
        } else {
            // list = do nothing
        }
    } else {
        //console.log("reading output")
        // output from LS instructions
        let newNode = {}
        if (line[0] == "d"){
            // new directory
            let dirName = line.split(" ")[1];
            //console.log({dirName})
            newNode = {
                name: dirName,
                isDirectory: true,
                children: [],
                parent: currentNode,
            };
        } else {
            // new file
            let fileSize = line.split(" ")[0];
            let fileName = line.split(" ")[1];
            //console.log({fileSize}, {fileName})
            newNode = {
                name: fileName,
                isDirectory: false,
                size: fileSize,
                parent: currentNode,
            };
        }
        currentNode.children.push(newNode);
        //console.log("added to current node", currentNode.children)
    }
  }
return tree
}

function getSize(node, directoryCallback = () => {}){
    // get size of files/directories in node

    if (!node.isDirectory){
        // its a file
        return node.size;
    } else {
        // it's a directory
        let totalSize = node.children
            .map((child) => getSize(child, directoryCallback))
            .reduce((a,b) => parseInt(a)+parseInt(b), 0);
        
        directoryCallback(node.name, totalSize)
        return totalSize
    }


    // get size of nested directory
}

function part1() {
    const tree = createTree(lines)
    const thresholdSize = 100000;
    
    let sumSmallFolder = 0;

    getSize(tree, (name, size) => {
        if (size < thresholdSize) {
            sumSmallFolder += size;
        }
    });

    console.log(sumSmallFolder);

}
  
//part1();



function part2() {
    const tree = createTree(lines)
    const totalDiskSpace = 70000000;
    const requiredSpace = 30000000;

    const treeSize = getSize(tree);
    console.log({treeSize})

    const unusedSpace = totalDiskSpace - treeSize;
    console.log({unusedSpace})

    if (unusedSpace >= requiredSpace){
        console.log("Enough space already exists")
        return
    } 

    const toBeDeleted = requiredSpace - unusedSpace;
    console.log({toBeDeleted});

    const candidates = [];

    getSize(tree, (name, size) => {
        if (size >= toBeDeleted) {
            candidates.push({
                name,
                size,
            });
        }
    });

    candidates.sort((a,b) => a.size - b.size);
    console.log(candidates[0])



}

part2();




/* Useful Stuff

let total = arr.reduce((a, b) => a + b, 0)
let overlap = a.filter(el => b.indexOf(el) !== -1);
let num = parseInt(str)

*/