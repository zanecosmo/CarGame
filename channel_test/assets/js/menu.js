import {Socket} from "phoenix"

const start = () => {
    // UTILITY FUNCTIONS
    const id = id => document.getElementById(id);
    const hide = element => element.style = "display: none";
    const show = element => element.style = "display: inline-block";
    const click = (element, callback) => element.addEventListener('click', () => callback());
    const renderShell = (shell) => id('shell').innerHTML = shell;    
    const renderPartial = (page) => id('partial').innerHTML = page;
    
    const renderDefaultPartial = () => {            
        renderPartial(
            `
            <div id="startGameButton" class="menuButton">Start Game</div>
            <div id="joinGameButton" class="menuButton">Join Game</div>
            `
        );

        // LOBBY CREATE + PLAYER JOIN LOOP
        let gameCode = "";
        let isHost = false;
        let totalPlayers = 0;
        let playerIndex = null;

        let playerList = [
            {index: null, name: null, host: false},
            {index: null, name: null, host: false},
            {index: null, name: null, host: false},
            {index: null, name: null, host: false}
        ];

        const createPlayer = (hostStatus) => {
            console.log("createPlayer CALLED");
            console.log(playerList);
            playerList[totalPlayers].index = totalPlayers;
            playerList[totalPlayers].name = `Player${(totalPlayers + 1).toString()}`;
            playerList[totalPlayers].host = hostStatus;
            console.log(playerList);
            totalPlayers++;
        };

        // let playerNames = ["", "", "", ""];
        let playerHTML = ["", "", "", ""];
        
        const updatePlayerHTML = () => {
            console.log("updatePlayerHTML CALLED");
            for (let i = 0; i < playerList.length; i++) {
                if (playerList[i].name !== null) {playerHTML[i] = 
                `
                <div>
                    <span>${i+1}. ${playerList[i].name !== "" ? playerList[i].name : "anonymous"}</span>                        
                    ${playerList[i].host === true ? "<span id='host'>HOST</span>" : ""}
                    ${playerIndex === i 
                        ? "<span id='changeNameButton' class='changeName'>change name</span>"
                        : ""
                    }
                    <span id="changeNameForm">
                        <input id="changeNameBox" class="input" type="text" placeholder="ENTER NAME" />
                        <span id="changeButton" class="changeName">CHANGE</span>
                    </span>                        
                </div>
                `;}
            }
        }

        const updatePlayerList = (player_list) => {
            console.log("updatePlayerList CALLED");
            for (let i = 0; i < playerList.length; i++) {
                playerList[i] = player_list[i];
            }
        };
        
        const loadLobby = (channel) => {
            console.log("LOBBY LOADED");
            renderPartial(
                `
                <div id="displayGameCode"> GAME-CODE: <span class="gameCode">${gameCode}</span></div>
                <br>
                
                <div class="text">PLAYERS
                    <div id="maxPlayers" class="redLetter">--max number of players reached--</div>
                </div>

                <div class="playersContainer">
                ${playerHTML[0]}
                ${playerHTML[1]}
                ${playerHTML[2]}
                ${playerHTML[3]}
                </div>                
                        
                ${isHost === true 
                    ? "<div id='playGameButton' class='menuButton'>Play</div>" 
                    : "<div class='smallText'>Please wait for host to start the game</div>"
                }
                <div id="leaveGameButton" class="menuButton">Leave Game</div>
                `
            );

            // INTERACTIVE DIV ELEMENTS
            if (totalPlayers === 4) {show(id('maxPlayersDiv'))};            
            
            if (id("changeNameButton")) {
                click(id('changeNameButton'), () => {
                    show(id('changeNameForm'));
                    hide(id('changeNameButton'))
                });
            };

            if(id("changeButton")) {
                click(id('changeButton'), () => {
                    show(id('changeNameButton'));
                    hide(id('changeNameForm'));
                    playerList[playerIndex].name = id("changeNameBox").value;                
                    channel.push("name_change_incoming", {player_list: playerList});
                });
            }
            if (isHost === true) {
                channel.on("name_change_outgoing", (name_update) => {
                    updatePlayerList(name_update.player_list)
                    channel.push("player_update_incoming", {player_list: playerList});
                });
            }
            
            if (isHost === true) {
                channel.on("match_request", (sent) => {
                    console.log("4. match_request RECEIVED")
                    if (sent.proposed_code === gameCode) {
                        channel.push("match_accepted", {
                            game_code: gameCode,
                            player_index: (totalPlayers),
                        });
                        console.log("5. match_accepted PUSHED ==>");
                    };
                    if (totalPlayers = 4) {
                        channel.off("match_request");
                    }
                })
            };

            if (isHost === true) {
                channel.on("player_joined", () => {
                    console.log("8. player_joined RECEIVED");
                    createPlayer(false);
                    channel.push("player_update_incoming", {player_list: playerList});
                    console.log("9. player_update_incoming PUSHED ==>")
                });
            }

            channel.on("player_update_outgoing", (sent) => {
                console.log("***10. player_update_outgoing RECEIVED");
                console.log(sent.player_list);
                updatePlayerList(sent.player_list);
                updatePlayerHTML();
                loadLobby(channel);
            })

            if (id("playGameButton")) {
                click(id('playGameButton'), () => {
                // DEFINES + RENDERS shell (static)                              
                renderShell(
                    `
                    <div></div>
                    `
                );
                
                // DEFINES + RENDERS partial (static)
                renderPartial(
                    `
                    <div id="square"><img id="car" src="blackCar.jpg"></div>
                    `
                );
                startRender();
            })};

            click(id('leaveGameButton'), renderDefaultPartial);
        }

        click(id('startGameButton'), () => {            
            for (let i = 0; i < 5; i++) {gameCode += Math.floor(Math.random()*10)};
            isHost = true;
            playerIndex = 0;
            
            const publicSocket = new Socket("/public_socket", {params: {token: window.userToken}});
            const publicLobby = publicSocket.channel(`public:lobby`, {});
            publicSocket.connect();
            publicLobby.join().receive("ok", (resp) => {console.log(`YOU'VE CREATED GAME ${gameCode}`, resp)});
            
            createPlayer(true);
            updatePlayerHTML();
            loadLobby(publicLobby);
        });

        // JOIN ATTEMPT + INVALID LOOP
        let tries = 0;        

        const loadJoinPage = (channel) => {                      
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
            
            if (tries > 1) show(id('invalidCode'));
            
            click(id('joinLobbyButton'), () => {
                console.log("2. join lobby PRESSED");
                if (id('codeBox').value === '') {
                    tries++;
                    loadJoinPage();                                    
                } else {
                    channel.push("find_match", {game_code: id("codeBox").value});
                    console.log("3. find_match PUSHED ==>");
                };
            });
            
            if (playerIndex === null) {
                channel.on("accepted", (sent) => {
                    console.log("6. accepted RECEIVED");
                    gameCode = sent.game_code;
                    playerIndex = sent.player_index
                    loadLobby(channel);
                    channel.push("fully_joined", {none: null});
                    console.log("7. fully_joined PUSHED ==>")
                    channel.off("accepted");
                })
            };
            
            click(id('backButton'), renderDefaultPartial);
        };
                        
        click(id('joinGameButton'), () => {
            console.log("1. Public Lobby JOINED");
            const publicSocket = new Socket("/public_socket", {params: {token: window.userToken}});
            const publicLobby = publicSocket.channel(`public:lobby`, {});
            publicSocket.connect();
            publicLobby.join();
            loadJoinPage(publicLobby);
        });
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