import * as dice from './yatzyProxy.mjs'

async function init(){
  let btnLogin = document.querySelector("#btnLogin");
  let textLogin = document.querySelector('#login');

  btnLogin.onclick = login
  

  async function login(){
    let playerName = textLogin.value;
    await dice.newGame(playerName);
    sessionStorage.setItem('playerID', playerName);

    window.location.href = "game.html";
  }
}

init();
