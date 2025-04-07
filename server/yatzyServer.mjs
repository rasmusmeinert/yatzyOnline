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
  logic.throwDice();
  response.status(201);
  response.send();
})

app.post("/setScore", (request, response) => {
  //Maaske virker det her ikke, men altsaa ideen er meget god
  logic.playerScores[request.body.index] = request.body.score;
  logic.resetDice;
  logic.resetThrowCount;
  response.status(201);
  response.send();

})


app.listen(port, () => console.log(`Server listening on port ${port}...`))
