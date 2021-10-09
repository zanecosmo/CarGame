

const menuShell =
    `
    <div class="title">MULTI-CAR</div>
    `

const startPage = 
    `
    <div id="startGameButton" class="menuButton">START GAME</div>
    <div id="joinGameButton" class="menuButton">JOIN GAME</div>
    `

const privateLobby = null;
    

const joinPage = 
    `
    <div class="text">ENTER GAME CODE:</div>
    <form>
    <input type="text" placeholder="enter game code here"/>
    <div id="joinLobbyButton" class="menuButton">JOIN</div>
    </form>
    <div id="backButton" class="menuButton">BACK</div>
    `

let isHost = false;

const rootShell = document.getElementById('shell');
const rootPartial = document.getElementById('partial');

const renderShell = (shell) => rootShell.innerHTML = shell;

renderShell(menuShell);

const renderPartial = (page) => rootPartial.innerHTML = page;

const partialThing = () => {
    
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
            let gameCode = "0";
            isHost = true; 
            let playerNumber = 4;           
            for (let i = 0; i < 4; i++) {gameCode += Math.floor(Math.random()*10)};
            
            renderPartial(
                `
                <div id="displayGameCode"> GAME-CODE: <span class="gameCode">${gameCode}</span></div>
                <br>
                <div class="text">PLAYERS
                    ${playerNumber === 4 
                        ? "<span class='redLetter'>--max number of players reached--</span>"
                        :""
                    }
                </div>
                
                <div class="playersContainer">
                    <div>1. PlayerName ${isHost === true ? "<span class='host'>--HOST--</span>" : ""}</div>                
                
                    <div>
                    ${playerNumber === 2 || playerNumber === 3 || playerNumber === 4
                        ? "2. PlayerName" 
                        : ""
                    } 
                    </div>
                    
                    <div>
                    ${playerNumber === 3 || playerNumber === 4
                        ? "3. PlayerName" 
                        : ""
                    }                 
                    </div>
                    
                    <div>
                    ${playerNumber === 4 
                        ? "4. PlayerName" 
                        : ""
                    } 
                    </div>
                </div>                
                       
                ${isHost === true 
                    ? "<div id='playGameButton' class='menuButton'>PLAY</div>" 
                    : ""
                }
                <div id="leaveGameButton" class="menuButton">LEAVE GAME</div>
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
            partialThing();
        })}
    };
    
    const playListener = (playButton) => {
        if (playButton) {playButton.addEventListener('click', () => {
            console.log("switch to level shell, go to level one partial")
        })}
    }

    const backListener = (backButton) => {
        if (backButton) {backButton.addEventListener('click', () => {
            partialThing();
        })}
    };
    
    partialThing();

    // --> onclick: if (isHost === true): choose new host, and exit back to start menu, and remove player from page
    // otherwise, simply exit to start menu and remove player from page
    
    //--> onclick: switch to level view, start game on level one

    // --> onclick: 
    // socket.connect on the open socket
    // if (textbox.value === random game code