

const menuShell =
    `
    <div class="title">MULTI-CAR</div>
    `

const startPage = 
    `
    <div id="startGameButton" class="menuButton">Start Game</div>
    <div id="joinGameButton" class="menuButton">Join Game</div>
    `

const privateLobby = null;
    

const joinPage = 
    `
    <div class="text">ENTER GAME CODE:</div>
    <form>
    <input type="text" class="input" placeholder="ENTER CODE HERE"/>
    <div id="invalidCode" class="redLetter">--invalid game-code, please try again--</div>
    <div id="joinLobbyButton" class="menuButton">Join</div>
    </form>
    <div id="backButton" class="menuButton">Back</div>
    `

const rootShell = document.getElementById('shell');
const rootPartial = document.getElementById('partial');

const renderShell = (shell) => rootShell.innerHTML = shell;

renderShell(menuShell);

const renderPartial = (page) => rootPartial.innerHTML = page;

const startPartial = () => {
    
    renderPartial(startPage);
        
    const startButton = document.getElementById("startGameButton");
    const joinButton = document.getElementById("joinGameButton");
    startListener(startButton);
    joinListener(joinButton);
}


const startListener = (startButton) => {
    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log("connect to host")
            let gameCode = "";
            let isHost = true; 
            let playerNumber = 3;
            let playerOneName = "bobert";
            let playerTwoName = "loandbehld";
            let playerThreeName = "jerish";
            let playerFourName = "";
            for (let i = 0; i < 5; i++) {gameCode += Math.floor(Math.random()*10)};
            
            renderPartial(
                `
                <div id="displayGameCode"> GAME-CODE: <span class="gameCode">${gameCode}</span></div>
                <br>
                <div class="text">PLAYERS
                    ${playerNumber === 4 
                        ? "<span id='maxPlayers' class='redLetter'>--max number of players reached--</span>"
                        :""
                    }
                </div>
                
                <div class="playersContainer">
                    <div>1. ${playerOneName} ${isHost === true ? "<span class='host'>HOST</span>" : ""}</div>                
                
                    <div>
                    ${playerTwoName !== ""
                        ? `2. ${playerTwoName}` 
                        : ""
                    } 
                    </div>
                    
                    <div>
                    ${playerThreeName !== ""
                        ? `3. ${playerThreeName}` 
                        : ""
                    }                 
                    </div>
                    
                    <div>
                    ${playerFourName !== "" 
                        ? `4. ${playerFourName}` 
                        : ""
                    } 
                    </div>
                </div>                
                       
                ${isHost === true 
                    ? "<div id='playGameButton' class='menuButton'>Play</div>" 
                    : "<div class='smallText'>Please wait for host to start the game</div>"
                }
                <div id="leaveGameButton" class="menuButton">Leave Game</div>
                `
                );
                
                const leaveButton = document.getElementById("leaveGameButton");
                const playButton = document.getElementById("playGameButton");
                leaveListener(leaveButton);
                playListener(playButton);
            })
        };
    }
    
    const joinListener = (joinButton) => {
        if (joinButton) {joinButton.addEventListener('click', () => {    
            renderPartial(joinPage);

            const backButton = document.getElementById("backButton");
            backListener(backButton);
        })}
    };
    
    const leaveListener = (leaveButton) => {
        if (leaveButton) {leaveButton.addEventListener('click', () => {
            console.log("leave server and switch hosts");
            startPartial();
        })}
    };
    
    const playListener = (playButton) => {
        if (playButton) {playButton.addEventListener('click', () => {
            renderShell(
                `
                <div></div>
                `
            );
            renderPartial(
                `
                <div id="square"><img id="car" src="blackCar.jpg"></div>
                `
            );
            startRender();
        })}
    }

    const backListener = (backButton) => {
        if (backButton) {backButton.addEventListener('click', () => {
            startPartial();
        })}
    };
    
    startPartial();

    // --> onclick: if (isHost === true): choose new host, and exit back to start menu, and remove player from page
    // otherwise, simply exit to start menu and remove player from page
    
    //--> onclick: switch to level view, start game on level one

    // --> onclick: 
    // socket.connect on the open socket
    // if (textbox.value === random game code