
// Setup dice array
export let players = [];
let die = { face: NaN, hold: false }

export let dice = []

export let throwCount = 0

for (let i = 0; i < 5; i++) {
  dice[i] = Object.create(die)
}

export let currentScores = []
export let playerScores = []

export function newGame(player) {
  //Init player object
  player = { dice: [] }
  player.currentScores = [];
  player.playerScores = [];
  player.throwCount = 0;
  for (let i = 0; i < 5; i++) {
    player.dice[i] = Object.create(die)
  }
  //Add player to list of players
  players.push(player);
  console.log(player);
}

//Throw all dice that are not on hold
export function throwDice(player) {
  player.throwCount++
  for (let die of dice) {
    if (player.die.hold === false) {
      player.die.face = Math.floor(Math.random() * 6 + 1)
    }
  }
  getResults()
}

export function resetDice() {
  for (let die of dice) {
    die.face = 0;
    die.hold = false
  }
  getResults()
}

export function resetThrowCount() {
  throwCount = 0;
}

export function totalScore() {
  let totalScore = 0
  for (let score of playerScores) {
    if (score != undefined) {
      totalScore += score
    }
  }
  totalScore += getBonus()
  return totalScore
}

export function pairScore() {
  let pairScore = 0
  for (let i = 0; i < 6; i++) {
    if (playerScores[i] != undefined) {
      pairScore += playerScores[i]
    }
  }
  return pairScore
}

export function getBonus() {
  if (pairScore() >= 63) {
    return 50
  }
  else return 0
}


export function getResults() {
  currentScores[0] = sameValuePoints(1)
  currentScores[1] = sameValuePoints(2)
  currentScores[2] = sameValuePoints(3)
  currentScores[3] = sameValuePoints(4)
  currentScores[4] = sameValuePoints(5)
  currentScores[5] = sameValuePoints(6)
  currentScores[6] = onePairPoints()
  currentScores[7] = twoPairPoints()
  currentScores[8] = threeSamePoints()
  currentScores[9] = fourSamePoints()
  currentScores[10] = fullHousePoints()
  currentScores[11] = smallStraightPoints()
  currentScores[12] = largeStraightPoints()
  currentScores[13] = chancePoints()
  currentScores[14] = yatzyPoints()
}

//Get the frequency of the dice values
export function frequency() {
  let frequency = [0, 0, 0, 0, 0, 0, 0]
  for (let die in dice) {
    frequency[dice[die].face]++
  }
  return frequency
}

//Return the amount of points for a given value (1-6)
export function sameValuePoints(value) {
  return frequency()[value] * value
}

//Return the amount of points for the highest pair
export function onePairPoints() {
  for (let i = 6; i > 0; i--) {
    if (frequency()[i] >= 2) {
      return i * 2
    }
  }
  return 0
}

export function twoPairPoints() {
  for (let i = 6; i > 0; i--) {
    if (frequency()[i] >= 2) {
      for (let j = i - 1; j > 0; j--) {
        if (frequency()[j] >= 2) {
          return i * 2 + j * 2
        }
      }
    }
  }
  return 0
}

export function threeSamePoints() {
  for (let i = 6; i > 0; i--) {
    if (frequency()[i] >= 3) {
      return i * 3
    }
  }
  return 0
}

export function fourSamePoints() {
  for (let i = 6; i > 0; i--) {
    if (frequency()[i] >= 4) {
      return i * 4
    }
  }
  return 0
}

export function fullHousePoints() {
  for (let i = 6; i > 0; i--) {
    if (frequency()[i] === 3) {
      for (let j = i - 1; j > 0; j--) {
        if (frequency()[j] === 2) {
          return i * 3 + j * 2
        }
      }
    }
  }
  return 0
}

export function smallStraightPoints() {
  let smallStraight = [0, 1, 1, 1, 1, 1, 0]
  for (let i = 0; i <= 6; i++) {
    if (frequency()[i] !== smallStraight[i]) {
      return 0
    }
  }
  return 15
}

export function largeStraightPoints() {
  let largeStraight = [0, 0, 1, 1, 1, 1, 1]
  for (let i = 0; i <= 6; i++) {
    if (frequency()[i] !== largeStraight[i]) {
      return 0
    }
  }
  return 20
}

export function chancePoints() {
  let chancePoints = 0
  for (let die of dice) {
    chancePoints += die.face
  }
  return chancePoints
}

export function yatzyPoints() {
  for (let i = 6; i > 0; i--) {
    if (frequency()[i] >= 5) {
      return 50
    }
  }
  return 0
}

let playerOne;
newGame(playerOne);
