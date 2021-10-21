// import {Socket} from "phoenix"

const start = () => {
    // UTILITY FUNCTIONS
    const id = id => document.getElementById(id);
    const show = element => element.style = "display: inline-block";
    const hide = element => element.style = "display: none";
    const click = (element, callback) => element.addEventListener('click', () => callback());
    const renderShell = (shell) => id('shell').innerHTML = shell;    
    const renderPartial = (page) => id('partial').innerHTML = page;

    const renderDefaultPartial = () => {
        // GAME STATE VARIABLES
        let gameCode = "";
        let isHost = false;
        let playerPosition = 0;
        let playerNumber = 0;
        let playerList = ["", "", "", "",];
                      
        renderPartial(
            `
            <div id="startGameButton" class="menuButton">Start Game</div>
            <div id="joinGameButton" class="menuButton">Join Game</div>
            `
        );
        
        // LOBBY CREATE + PLAYER JOIN LOOP
        const updatePlayers = (name, position) => {
            playerList[position] = 
            `
            <div>
                <span>${position + 1}. ${name ? name : "anonymous"}</span>                        
                <span id='host'>HOST</span>
                <span id="changeNameButton" class="changeName">change name</span>
                <span id="changeNameForm">
                    <input id="changeNameBox" class="input" type="text" placeholder="ENTER NAME" />
                    <span id="changeButton" class="changeName">CHANGE</span>
                </span>                        
            </div>
            `;
            // playerNameArray.push(name);
        }
        
        const loadLobby = (channel) => {                                  
            // DEFINES + RENDERS partial (dynamic)                    
            renderPartial(
                `
                <div id="displayGameCode"> GAME-CODE: <span class="gameCode">${gameCode}</span></div>
                <br>
                
                <div class="text">PLAYERS
                    <div id="maxPlayers" class="redLetter">--max number of players reached--</div>
                </div>

                <div class="playersContainer">
                ${playerList[0]}
                ${playerList[1]}
                ${playerList[2]}
                ${playerList[3]}
                </div>                
                        
                ${isHost === true 
                    ? "<div id='playGameButton' class='menuButton'>Play</div>" 
                    : "<div class='smallText'>Please wait for host to start the game</div>"
                }
                <div id="leaveGameButton" class="menuButton">Leave Game</div>
                `
            );           
            
            // USES dom elements ///////////////////////////////////////
            if (isHost === true) {show(id('host'))};
            if (playerNumber === 4) {show(id('maxPlayersDiv'))};            
            
            click(id('changeNameButton'), () => {
                show(id('changeNameForm'));
                hide(id('changeNameButton'));
            });

            click(id('changeButton'), () => {
                show(id('changeNameButton'));
                hide(id('changeNameForm'));
                updatePlayers(id("changeNameBox").value, playerPosition);
                // if (playerNumber > 1) {channel.push("nameChangeOutgoing", {
                //     name: id("changeNameBox").value,
                //     position: playerPosition
                // })};
                loadLobby(channel);
            });

            click(id('leaveGameButton'), renderDefaultPartial);                               
                                                                            
            click(id('playGameButton'), () => {
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
            });
            // if (playerNumber > 1 {
            // channel.on("nameChangeIncoming", (newName) => {
            //     updatePlayers(newName.name, newName.position);
            //     loadLobby(channel);
            // });
            // })
        }

        click(id('startGameButton'), () => {            
            for (let i = 0; i < 5; i++) {gameCode += Math.floor(Math.random()*10)};
            isHost = true;
            
            // const privateSocket = new Socket("/private_socket", {params: {token: window.userToken}});
            // const privateChannel = privateSocket.channel(`private:${gameCode}`, {});
            // privateSocket.connect();
            // privateChannel.join().receive("ok", (resp) => {console.log(`YOU'VE CREATED GAME ${gameCode}`, resp)})
            
            playerNumber++;
            playerPosition = 0;
            const playerName = `Player${playerNumber.toString()}`;
            updatePlayers(playerName, playerPosition);                                                
            loadLobby();
        });

        // JOIN ATTEMPT + INVALID LOOP
        let tryNumber = 1;        

        const attemptJoin = (tries) => {            
            // DEFINES + RENDERS partial (dynamic)                
            renderPartial(
                `
                <div class="text">ENTER GAME CODE:</div>
                
                <input id="codeBox" type="text" class="input" placeholder="ENTER CODE HERE"/>
                <div id="invalidCode" class="redLetter">--invalid game-code, please try again${
                    tries === 1
                        ? ''
                        : ` (${tries.toString()})`
                }--</div>                
                
                <div id="joinLobbyButton" class="menuButton">Join</div>                
                <div id="backButton" class="menuButton">Back</div>
                `
            );                
            
            // USES dom elements ///////////////////////////////////////
            if (tryNumber > 1) show(id('invalidCode'));        

            click(id('backButton'), renderDefaultPartial);
            
            click(id('joinLobbyButton'), () => {                
                if (id('codeBox').value === '') {                    
                    console.log(tries);
                    tryNumber++;
                    attemptJoin(tryNumber);                                    
                } else {
                    const privateSocket = new Socket("/private_socket", {params: {token: window.userToken}});
                    const privateChannel = privateSocket.channel(`private:${id("codeBox").value}`, {});
                    privateSocket.connect();
                    privateChannel.join();
                    privateChannel.push("joinRequest", )
                };

            });
        };
                        
        click(id('joinGameButton'), () => attemptJoin(tryNumber));    
        
    };                    
        
    // DEFINES + RENDERS shell
    renderShell(
        `
        <div class="title">MULTI-CAR</div>
        `
    );
    
    //RENDERS DEFAULT PARTIAL
    renderDefaultPartial();
};

// RUNS JAVASCIPT SINGLE PAGE APPLICATION
start();