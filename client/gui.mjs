import * as dice from './yatzyProxy.mjs'

async function init() {
  let btnRoll = document.querySelector("#btnRoll")
  let ones = document.querySelector("#txfOnes")
  let twos = document.querySelector("#txfTwos")
  let threes = document.querySelector("#txfThrees")
  let fours = document.querySelector("#txfFours")
  let fives = document.querySelector("#txfFives")
  let sixes = document.querySelector("#txfSixes")
  let onePair = document.querySelector("#txfOnePair")
  let twoPairs = document.querySelector("#txfTwoPairs")
  let threeSame = document.querySelector("#txfThreeSame")
  let fourSame = document.querySelector("#txfFourSame")
  let fullHouse = document.querySelector("#txfFullHouse")
  let smallStraight = document.querySelector("#txfSmallStraight")
  let largeStraight = document.querySelector("#txfLargeStraight")
  let chance = document.querySelector("#txfChance")
  let yatzy = document.querySelector("#txfYatzy")
  let diceImages = document.querySelectorAll(".dice")
  let turns = document.querySelector("#turns")
  let total = document.querySelector("#txfTotal")
  let pairSum = document.querySelector("#txfSum")
  let bonus = document.querySelector("#txfBonus")
  let btnScores = Array.from(document.querySelectorAll(".btnScores"))
  let scoreBoard = document.querySelector("#playerSection");

  let textFields = [ones, twos, threes, fours, fives, sixes, onePair, twoPairs, threeSame, fourSame, fullHouse
    , smallStraight, largeStraight, chance, yatzy]

  let playerID = sessionStorage.getItem('playerID');
  dice.setPlayerID(playerID);


  btnRoll.onclick = rollClick

  for (let die of diceImages) {
    die.onclick = toggleHold
  }

  for (let btn of btnScores) {
    btn.onclick = selectScore
  }


  async function rollClick(event) {
    let diceThrow = await dice.getThrowCount();
    if (diceThrow < 3) {
      await dice.throwDice()
      updateDieImage()
      smartUpdateScores()
      turns.innerHTML = 3 - (diceThrow + 1);
    }
  }

  async function toggleHold(event) { //TODO virker ikke nu
    if (await dice.getThrowCount() != 0) {
      let diceNumber = event.target.id.charAt(3)
      //Fixes off by one error
      diceNumber--
      let diceArray = await dice.getDice()
      let die = diceArray[diceNumber];
      if (die.hold == true) {
        event.target.style.border = '0px solid'
        event.target.style.borderRadius = "15px"
        dice.toggleHold(diceNumber);
      } else {
        event.target.style.border = '2px solid #fe8019'
        event.target.style.borderRadius = "18px"
        dice.toggleHold(diceNumber);
      }
    }
  }

  async function selectScore(event) {
    //Finds corresponding textfield to the button that is pressed
    let index = btnScores.indexOf(event.target)
    let textField = textFields[index]
    let score = textField.value
    //Posts a score serverside with /setScore(index,post)
    await dice.setScore(index);

    //Disables button, so that score can no longer be set
    textField.style.backgroundColor = '#83a598'
    event.target.disabled = true

    //Here we update the visual representation of points
    total.value = await dice.totalScore()
    pairSum.value = await dice.pairScore()
    bonus.value = await dice.getBonus()
    resetThrowCount()
  }


  async function resetThrowCount() {
    turns.innerHTML = 3 - (await dice.getThrowCount());
    updateDieImage()
    smartUpdateScores()
    resetHold()
  }

  function resetHold() {
    for (let die of diceImages) {
      die.style.border = '0px solid'
      die.style.borderRadius = "15px"
    }
  }


  //Updates all scores that are not already set in the playerscores
  async function smartUpdateScores() {
    let playerScores = await dice.getPlayerScores();
    let currentScores = await dice.getCurrentScores();
    for (let textField in textFields) {
      if (playerScores[textField] == undefined) {
        if (currentScores[textField] != 0) {
          textFields[textField].value = currentScores[textField]
        } else {
          textFields[textField].value = ""
        }
      }
    }
  }

  //Updates dice image to represent new roll
  async function updateDieImage() {
    let diceFaces = await dice.getDice();
    for (let i = 0; i < 5; i++) {
      diceImages[i].src = `images/dice${diceFaces[i].face}.png`
    }

  }


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function updateScoreboard() {
    while (true) {
      let players = await dice.getPlayers();
      console.log(players)
      let html = ["<strong> Players </strong>"];
      for (let p in players) {
        html.push(`<p id="player${(p % 7)}">${players[p].playerID}: ${players[p].playerTotalScore} </p>`)
      }
      scoreBoard.innerHTML = html.join("");
      await sleep(2500);
    }
  }
  updateScoreboard();
}

init();
