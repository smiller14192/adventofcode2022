const fs = require("fs");

const lines = fs
  .readFileSync("day02.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // split on newline
  //.split("\n\n") // split by empty line
  .filter(Boolean) // Remove empty lines
  //.map((x) => x.split("\n")); // split each element by new line
  //.map(Number); // Parse each line into a number
  .map(x => x.split(" ")); // Parse each line into an array

  //console.log(lines)

function part1() {    
    // calcualte score for each round
    let scores = lines.map(x => playGame(x))

    let totalScore = scores.reduce((a, b) => a + b, 0)

    console.log (totalScore)
}
//part1();

function playGame(game) {
    let score = 0
    let opp = game[0]
    let response = game[1]

    // outcome score
    switch (game.toString()){
        case 'A,Y':
            score += 6
            break;
        case 'B,Z':
            score += 6
            break;   
        case 'C,X':
            score += 6
            break;
        case 'A,X':
            score += 3
            break;
        case 'B,Y':
            score += 3
            break;   
        case 'C,Z':
            score += 3
            break;
    }

    // shape score
    switch(response) {
        case 'X':
            score += 1
            break;
        case 'Y':
            score += 2
            break;
        case 'Z':
            score += 3
            break;
    }
    console.log({game, score})
    return score
}


function part2() {
    // calcualte score for each round
    let scores = lines.map(x => playGame2(x))

    let totalScore = scores.reduce((a, b) => a + b, 0)

    console.log (totalScore)
  
}

part2();

function playGame2(game) {
    let score = 0
    let opp = game[0]
    let outcome = game[1]
    let response = ''

    if (outcome == 'Y') {
        response = opp
        score += 3
    } else if (outcome == 'X') {
        if (opp =='A') {response = 'C'}
        else if (opp == 'B') {response = 'A'}
        else {response = 'B'}
    } else {
        if (opp == 'A') {response = 'B'}
        else if (opp == 'B') {response = 'C'}
        else {response = 'A'}
        score += 6
    }

    // shape score
    switch(response) {
        case 'A':
            score += 1
            break;
        case 'B':
            score += 2
            break;
        case 'C':
            score += 3
            break;
    }

    console.log({game, opp, outcome, response, score})
    return score

}





/* mapping
A - Rock
B - Paper
C - Scissors

X - Lose
Y - Draw
Z - Win


Winning
Rock A - Paper Y
Paper B - Scissors Z
Scissors C - Rock X

Draw
A - X
B - Y
C - Z


/* SCORING
Your total score is the sum of your scores for each round.
The score for a single round is the 
score for the shape you selected 
    (1 for Rock, 
    2 for Paper, 
    3 for Scissors) 
plus the score for the outcome of the round 
    (0 if you lost, 
    3 if the round was a draw, 
    and 6 if you won).

*/