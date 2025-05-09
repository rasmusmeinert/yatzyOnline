
// Setup dice array
export let players = [];
let die = { face: NaN, hold: false }

export let dice = []


for (let i = 0; i < 5; i++) {
  dice[i] = Object.create(die)
}

export let currentScores = []
export let playerScores = []

export function findPlayer(playerID) {
  //Find and return the player with the given playerID
  console.log("Finding Player: " + playerID) //Debug info
  let foundPlayer;
  for (let p of players) {
    if (p.playerID == String(playerID)) {
      foundPlayer = p;
    }
  }
  console.log("Found: " + foundPlayer); //Debug info
  return foundPlayer;
}

export function newGame(playerID) {
  //Init player object
  let player = { playerID: playerID, dice: [], currentScores: [], playerScores: [], throwCount: 0, playerTotalScore: 0 }
  for (let i = 0; i < 5; i++) {
    player.dice[i] = Object.create(die)
  }
  //Add player to list of players
  players.push(player);
  console.log(players);
}

//Throw all dice that are not on hold
export function throwDice(player) {
  player.throwCount++
  for (let die of player.dice) {
    if (die.hold === false) {
      die.face = Math.floor(Math.random() * 6 + 1)
    }
  }
  getResults(player)
}

export function resetDice(player) {
  for (let die of player.dice) {
    die.face = 0;
    die.hold = false
  }
  getResults(player)
}

export function resetThrowCount(player) {
  player.throwCount = 0;
}

export function totalScore(player) {
  let totalScore = 0
  for (let score of player.playerScores) {
    if (score != undefined) {
      totalScore += score
    }
  }
  totalScore += getBonus(player)
  player.playerTotalScore = totalScore;
  return totalScore
}

export function pairScore(player) {
  let pairScore = 0
  for (let i = 0; i < 6; i++) {
    if (player.playerScores[i] != undefined) {
      pairScore += player.playerScores[i]
    }
  }
  return pairScore
}

export function getBonus(player) {
  if (pairScore(player) >= 63) {
    return 50
  }
  else return 0
}


export function getResults(player) {
  player.currentScores[0] = sameValuePoints(1, player)
  player.currentScores[1] = sameValuePoints(2, player)
  player.currentScores[2] = sameValuePoints(3, player)
  player.currentScores[3] = sameValuePoints(4, player)
  player.currentScores[4] = sameValuePoints(5, player)
  player.currentScores[5] = sameValuePoints(6, player)
  player.currentScores[6] = onePairPoints(player)
  player.currentScores[7] = twoPairPoints(player)
  player.currentScores[8] = threeSamePoints(player)
  player.currentScores[9] = fourSamePoints(player)
  player.currentScores[10] = fullHousePoints(player)
  player.currentScores[11] = smallStraightPoints(player)
  player.currentScores[12] = largeStraightPoints(player)
  player.currentScores[13] = chancePoints(player)
  player.currentScores[14] = yatzyPoints(player)
}

//Get the frequency of the dice values
export function frequency(player) {
  let frequency = [0, 0, 0, 0, 0, 0, 0]
  for (let die in player.dice) {
    frequency[player.dice[die].face]++
  }
  return frequency
}

//Return the amount of points for a given value (1-6)
export function sameValuePoints(value, player) {
  return frequency(player)[value] * value
  console.log(`Score ${request.body.index} is now ${logic.currentScores[request.body.index]}`)
}

//Return the amount of points for the highest pair
export function onePairPoints(player) {
  for (let i = 6; i > 0; i--) {
    if (frequency(player)[i] >= 2) {
      return i * 2
    }
  }
  return 0
}

export function twoPairPoints(player) {
  for (let i = 6; i > 0; i--) {
    if (frequency(player)[i] >= 2) {
      for (let j = i - 1; j > 0; j--) {
        if (frequency(player)[j] >= 2) {
          return i * 2 + j * 2
        }
      }
    }
  }
  return 0
}

export function threeSamePoints(player) {
  for (let i = 6; i > 0; i--) {
    if (frequency(player)[i] >= 3) {
      return i * 3
    }
  }
  return 0
}

export function fourSamePoints(player) {
  for (let i = 6; i > 0; i--) {
    if (frequency(player)[i] >= 4) {
      return i * 4
    }
  }
  return 0
}

export function fullHousePoints(player) {
  for (let i = 6; i > 0; i--) {
    if (frequency(player)[i] === 3) {
      for (let j = 6; j > 0; j--) {
        if (frequency(player)[j] === 2) {
          return i * 3 + j * 2
        }
      }
    }
  }
  return 0
}

export function smallStraightPoints(player) {
  let smallStraight = [0, 1, 1, 1, 1, 1, 0]
  for (let i = 0; i <= 6; i++) {
    if (frequency(player)[i] !== smallStraight[i]) {
      return 0
    }
  }
  return 15
}

export function largeStraightPoints(player) {
  let largeStraight = [0, 0, 1, 1, 1, 1, 1]
  for (let i = 0; i <= 6; i++) {
    if (frequency(player)[i] !== largeStraight[i]) {
      return 0
    }
  }
  return 20
}

export function chancePoints(player) {
  let chancePoints = 0
  for (let die of player.dice) {
    chancePoints += die.face
  }
  return chancePoints
}

export function yatzyPoints(player) {
  for (let i = 6; i > 0; i--) {
    if (frequency(player)[i] >= 5) {
      return 50
    }
  }
  return 0
}

//NOTE Nametest
// let names = ["Rasmus", "Mark", "Christian", "Jakob med C", "Tobias", "Mads", "Nilb0t", "Phillip","Jens "]
// names.forEach(e => newGame(e));
