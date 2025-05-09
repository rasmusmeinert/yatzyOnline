import * as logic from "./yatzy.mjs"
import express from "express";
import cors from 'cors';
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/getPlayers", (request, response) => {
  let players = logic.players;
  response.send(players);
})

app.get("/getDice", (request, response) => {
  let player = logic.findPlayer([request.query.playerID])
  response.send(player.dice);
})

app.get("/getThrowCount", (request, response) => {
  let playerID = request.query.playerID;
  let player = logic.findPlayer([playerID])
  response.send(player.throwCount);
})

app.get("/getCurrentScores", (request, response) => {
  let player = logic.findPlayer([request.query.playerID])
  response.send(player.currentScores);
})

app.get("/getPlayerScores", (request, response) => {
  let player = logic.findPlayer([request.query.playerID])
  response.send(player.playerScores);
})

app.get("/getTotalScore", (request, response) => {
  let player = logic.findPlayer([request.query.playerID])
  response.send(logic.totalScore(player));
})

app.get("/getBonus", (request, response) => {
  let player = logic.findPlayer([request.query.playerID])
  response.send(logic.getBonus(player));
})

app.get("/getPairScore", (request, response) => {
  let player = logic.findPlayer([request.query.playerID])
  response.send(logic.pairScore(player));
})

app.post("/throwDice", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  console.log('Dice thrown')
  logic.throwDice(player);
  response.status(201);
  response.send();
})

app.post("/newGame", (request, response) => {
  console.log(`${[request.body.playerID]} started a new game`)
  logic.newGame([request.body.playerID]);
  response.status(201);
  response.send();
})

app.post("/toggleHold", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  let die = player.dice[request.body.die];
  die.hold = die.hold == true ? false : true;
  console.log(`Die ${request.body.die} hold is now ${die.hold}`)
  response.status(201);
  response.send();
})

app.post("/setScore", (request, response) => {
  let player = logic.findPlayer([request.body.playerID])
  player.playerScores[request.body.index] = player.currentScores[request.body.index];
  logic.resetDice(player);
  logic.resetThrowCount(player);
  response.status(201);
  response.send();

})


app.listen(port, () => console.log(`Server listening on port ${port}...`))
