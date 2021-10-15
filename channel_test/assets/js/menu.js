const start = () => { 
    //SELECTS dom elements from index.html
    const rootShell = document.getElementById('shell');
    const rootPartial = document.getElementById('partial');
    
    // USES dom elements
    const renderShell = (shell) => rootShell.innerHTML = shell;    
    const renderPartial = (page) => rootPartial.innerHTML = page;
    
    const renderDefaultPartial = () => {
        // DEFINES partial (static)       
        const startPage = (
            `
            <div id="startGameButton" class="menuButton">Start Game</div>
            <div id="joinGameButton" class="menuButton">Join Game</div>
            `
        );        
        
        // RENDERS partial (static)
        renderPartial(startPage);
            
        // SELECTS dom elements from partial 
        const startButton = document.getElementById("startGameButton");
        const joinButton = document.getElementById("joinGameButton");
    
        // USES dom elements                
        if (joinButton) {joinButton.addEventListener('click', () => {                
            // DEFINES partial (static)                
            const joinPage = (
                `
                <div class="text">ENTER GAME CODE:</div>
                
                <form>
                <input type="text" class="input" placeholder="ENTER CODE HERE"/>
                <div id="invalidCode" class="redLetter">--invalid game-code, please try again--</div>
                <div id="joinLobbyButton" class="menuButton">Join</div>
                </form>
                
                <div id="backButton" class="menuButton">Back</div>
                `
            );                
                
            // RENDERS partial (static)
            renderPartial(joinPage);

            // SELECTS dom elements from partial
            const backButton = document.getElementById("backButton");

            // USES dom elements
            if (backButton) {backButton.addEventListener('click', () => {
                renderDefaultPartial();
            })};                                                    
        })};        
                
        if (startButton) {startButton.addEventListener('click', () => {
            // DECLARES dynamic variables
            //#region
            console.log("connect to host")
            let gameCode = "";
            let isHost = true; 
            let playerNumber = 3;
            let playerOneName = "bobert";
            let playerTwoName = "loandbehld";
            let playerThreeName = "jerish";
            let playerFourName = "";
            for (let i = 0; i < 5; i++) {gameCode += Math.floor(Math.random()*10)};
            //#endregion

            // DEFINES partial (dynamic)                    
            const lobbyPage = (
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

            // RENDERS partial (dynamic)
            renderPartial(lobbyPage);

            // SELECTS dom elements from partial        
            const leaveButton = document.getElementById("leaveGameButton");
            const playButton = document.getElementById("playGameButton");
            
            // USES dom elements                                    
            if (leaveButton) {leaveButton.addEventListener('click', () => {
                console.log("leave server and switch hosts");
                renderDefaultPartial();
            })};                                 
                                                    
            if (playButton) {playButton.addEventListener('click', () => {                
                // DEFINES shell (static)                              
                const levelShell = (
                    `
                    <div></div>
                    `
                );

                //RENDERS shell
                renderShell(levelShell);
                
                renderPartial(
                    `
                    <div id="square"><img id="car" src="blackCar.jpg"></div>
                    `
                );
                
                startRender();
            })};                                
        })};
    };                
        
    // DEFINE SHELL
    const menuShell = (
        `
        <div class="title">MULTI-CAR</div>
        `
    );
    
    //RENDERS SHELL
    renderShell(menuShell);
    
    //RENDERS DEFAULT PARTIAL
    renderDefaultPartial();
};

// RUNS JAVASCIPT SINGLE PAGE APPLICATION
start();