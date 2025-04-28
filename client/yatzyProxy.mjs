// import fetch from "node-fetch";
const baseUrl = "http://localhost:8000"

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
    throwCount = await get(baseUrl + "/getThrowCount");
  } catch (error) {
    console.log(error);
  }
  return throwCount;
}

export async function getDice() {
  let dice;
  try {
    dice = await get(baseUrl + "/getDice");
  } catch (error) {
    console.log(error);
  }
  return dice;
}

export async function getPlayerScores() {
  let dice;
  try {
    dice = await get(baseUrl + "/getPlayerScores");
  } catch (error) {
    console.log(error);
  }
  return dice;
}

export async function getCurrentScores() {
  let dice;
  try {
    dice = await get(baseUrl + "/getCurrentScores");
  } catch (error) {
    console.log(error);
  }
  return dice;
}

export async function throwDice() {
  try {
    let respons = await post(baseUrl + "/throwDice", {});
  } catch (error) {
    console.log(error)
  }
}

export async function toggleHold(die) {
  try {
    let respons = await post(baseUrl + "/toggleHold", {die: die});
  } catch (error) {
    console.log(error)
  }
}

export async function setScore(index) {
  try {
    let response = await post(baseUrl + "/setScore", { index: index})
  } catch (error) {
    console.log(error)
  }
}

