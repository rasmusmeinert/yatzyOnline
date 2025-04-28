import * as logic from "./yatzy.mjs"
import express from "express";
const app = express();
const port = 8000;

app.use(express.json());

app.get("/getDice", (request, response) => {
  response.send(logic.dice);
})

app.get("/getThrowCount", (request, response) => {
  response.send(logic.throwCount);
})

app.get("/getCurrentScores", (request, response) => {
  response.send(logic.currentScores);
})

app.get("/getPlayerScores", (request, response) => {
  response.send(logic.playerScores);
})


app.post("/throwDice", (request, response) => {
  console.log('Dice thrown')
  logic.throwDice();
  response.status(201);
  response.send();
})

app.post("/toggleHold", (request, response) => {
  let die = logic.dice[request.body.die];
  die.hold = die.hold == true ? false : true;
  console.log(`Die ${request.body.die} hold is now ${die.hold}`)
  response.status(201);
  response.send();
})

app.post("/setScore", (request, response) => {
  logic.playerScores[request.body.index] = logic.currentScores[request.body.index];
  console.log(`Score ${request.body.index} is now ${logic.currentScores[request.body.index]}`)
  logic.resetDice();
  logic.resetThrowCount();
  response.status(201);
  response.send();

})


app.listen(port, () => console.log(`Server listening on port ${port}...`))
