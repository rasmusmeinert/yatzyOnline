import fetch from "node-fetch";
const url = "http://localhost:8000"

async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200) // OK
    throw new Error(respons.status);
  return await respons.json();
}

async function post(url, objekt) {
  const respons = await fetch(url, {
    method: "POST",
    body: JSON.stringify(objekt),
    headers: { 'Content-Type': 'application/json' }
  });
  if (respons.status !== 201) // Created
    throw new Error(respons.status);
  return await respons.text();
}

async function getThrowCount() {
  let throwCount;
  try {
    throwCount = await get(url + "/getThrowCount");
  } catch (error) {
    console.log(error);
  }
  return throwCount;
}

async function getDice() {
  let dice;
  try {
    dice = await get(url + "/getDice");
  } catch (error) {
    console.log(error);
  }
  return dice;
}

async function getPlayerScores() {
  let dice;
  try {
    dice = await get(url + "/getPlayerScores");
  } catch (error) {
    console.log(error);
  }
  return dice;
}

async function getCurrentScores() {
  let dice;
  try {
    dice = await get(url + "/getCurrentScores");
  } catch (error) {
    console.log(error);
  }
  return dice;
}

async function throwDice() {
  try {
    let respons = post(url + "/throwDice", {});
  } catch (error) {
    console.log(error)
  }
}

async function toggleHold(die) {
  try {
    let respons = post(url + "/toggleHold", {die: die});
  } catch (error) {
    console.log(error)
  }
}

async function setScore(index) {
  try {
    let response = post(url + "/setScore", { index: index})
  } catch (error) {
    console.log(error)
  }
}

throwDice();
setScore(1);

