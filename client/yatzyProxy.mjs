// import fetch from "node-fetch";
const baseUrl = "http://localhost:8000"
//TODO this is just to test player ID 
const playerID = "rasmus"

export async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200) // OK
    throw new Error(respons.status);
  return await respons.json();
}

export async function post(url, objekt) {
  const respons = await fetch(url, {
    method: "POST",
    body: JSON.stringify(objekt),
    headers: { 'Content-Type': 'application/json' }
  });
  if (respons.status !== 201) // Created
    throw new Error(respons.status);
  return await respons.text();
}

export async function getThrowCount() {
  let throwCount;
  try {
    throwCount = await get(baseUrl + "/getThrowCount", {playerID: "rasmus"});
  } catch (error) {
    console.log(error);
  }
  return throwCount;
}

export async function getDice() {
  let dice;
  try {
    dice = await get(baseUrl + "/getDice", {playerID: playerID});
  } catch (error) {
    console.log(error);
  }
  return dice;
}

export async function getPlayerScores() {
  let playerScores;
  try {
    playerScores = await get(baseUrl + "/getPlayerScores", {playerID: playerID});
  } catch (error) {
    console.log(error);
  }
  return playerScores;
}

export async function getCurrentScores() {
  let currentScores;
  try {
    currentScores = await get(baseUrl + "/getCurrentScores", {playerID: playerID});
  } catch (error) {
    console.log(error);
  }
  return currentScores;
}


export async function totalScore() {
  let totalScore;
  try {
    totalScore = await get(baseUrl + "/getTotalScore", {playerID: playerID});
  } catch (error) {
    console.log(error);
  }
  return totalScore;
}

export async function pairScore() {
  let pairScore;
  try {
    pairScore = await get(baseUrl + "/getPairScore", {playerID: playerID});
  } catch (error) {
    console.log(error);
  }
  return pairScore;
}
export async function getBonus() {
  let bonus;
  try {
    bonus = await get(baseUrl + "/getBonus", {playerID: playerID});
  } catch (error) {
    console.log(error);
  }
  return bonus;
}
export async function throwDice() {
  try {
    let respons = await post(baseUrl + "/throwDice", {playerID: playerID});
  } catch (error) {
    console.log(error)
  }
}

export async function toggleHold(die) {
  try {
    let respons = await post(baseUrl + "/toggleHold", {playerID: playerID, die: die});
  } catch (error) {
    console.log(error)
  }
}

export async function setScore(index) {
  try {
    let response = await post(baseUrl + "/setScore", {playerID: playerID, index: index})
  } catch (error) {
    console.log(error)
  }
}

