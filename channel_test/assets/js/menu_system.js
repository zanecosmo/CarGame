import {Socket} from "phoenix";

console.log("menu reading");

const publicSocket = new Socket("/public_socket", {params: {token: window.userToken}});
const publicChannel = publicSocket.channel("public:lobby", {});
const startButton = document.getElementById("startGameButton");
const gameTitle = document.getElementById("displayGameCode")

const createGameInstance = () => {
    console.log("startPressed");
    publicSocket.connect();
    publicChannel.join()
      .receive("ok", (resp) => {console.log("JOINED PUBLIC CHANNEL", resp);})
      .receive("error", (resp) => {console.log("UNABLE TO JOIN PUBLIC CHANNEL", resp);});
    let gameCode = "";
    for (let i = 0; i < 4; i++) {gameCode += Math.floor(Math.random()*10)};
    if (gameTitle) {gameTitle.innerHTML = `<p class="gameTitle"> Game Code: ${gameCode} </p>`};

  //publicChannel.push("createGameInstance", {game: gameCode});
  
};

if (startButton) {startButton.onclick = createGameInstance};