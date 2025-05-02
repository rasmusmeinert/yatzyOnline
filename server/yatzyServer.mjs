import * as logic from "./yatzy.mjs"
import express from "express";
import cors from 'cors';
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/getDice", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  response.send(player.dice);
})

app.get("/getThrowCount", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  response.send(player.throwCount);
})

app.get("/getCurrentScores", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  response.send(player.currentScores);
})

app.get("/getPlayerScores", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  response.send(player.playerScores);
})

app.get("/getTotalScore", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  response.send(totalScore(player));
})

app.get("/getBonus", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  response.send(logic.getBonus(player));
})

app.get("/getPairScore", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  response.send(logic.pairScore(player));
})

app.post("/throwDice", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  console.log('Dice thrown')
  logic.throwDice(player);
  response.status(201);
  response.send();
})

//TODO we probably need to rethink this, as it is now multipalyer
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
