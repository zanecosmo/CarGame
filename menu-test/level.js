// DECLARE GLOBAL VARIABLES
//#region
const topSpeed = 10;
const turnRadius = 5;                               
let playerPosition = [0,0];
let playerRotation = 0; 
let currentSpeed = 0;
//#endregion

// UTILITY FUNCTIONS
//#region 
const findCoordinates = (degrees) => {
  let radians = degrees*(Math.PI/180);
  let X = currentSpeed*Math.cos(radians);
  let Y = currentSpeed*Math.sin(radians);
  return {X: X,Y: Y}
};

const accelerate = (mod, x, y) => {
  if (keyVerb[0].tween === true || keyVerb[1].tween === true) {
    keyVerb[0].tween = false;
    keyVerb[1].tween = false;
  }
  playerPosition[0] += mod*x; 
  playerPosition[1] += mod*y; 
  if (currentSpeed < topSpeed) {
    currentSpeed++
  }                    
}        

const deccelerate = (mod, x, y) => {
  playerPosition[0] += mod*x; 
  playerPosition[1] += mod*y; 
  if (currentSpeed > 0) {
      currentSpeed--
    } else {
      keyVerb[0].tween = false;
      keyVerb[1].tween = false;
    }
  }
  
  const steerLeft = () => {
    if (keyVerb[0].bool === true || keyVerb[0].tween === true) {
      playerRotation += turnRadius
    } else if (keyVerb[1].bool === true || keyVerb[1].tween === true) {
      playerRotation -= turnRadius
    }
  }
  
  const steerRight = () => {
    if (keyVerb[0].bool === true || keyVerb[0].tween === true) {
      playerRotation -= turnRadius
    } else if (keyVerb[1].bool === true || keyVerb[1].tween === true) {
      playerRotation += turnRadius
    }
  }
  
  const steerEnd = (mod) => {
    keyVerb[mod].tween = false
  }
//#endregion
  
// BUTTON-PRESS OBJECTS ARRAY 
let keyVerb = [
  {button: "w", tween: false, bool: false, otherAction: deccelerate, action: accelerate, modifier: -1},
  {button: "s", tween: false, bool: false, otherAction: deccelerate, action: accelerate, modifier: 1},
  {button: "a", tween: false, bool: false, otherAction: steerEnd, action: steerLeft, modifier: 2},      
  {button: "d", tween: false, bool: false, otherAction: steerEnd, action: steerRight, modifier: 3}
];
  
// KEYPRESS SOCKET HANDLERS 
document.addEventListener('keydown', (e) => {                
  for (let i = 0; i < keyVerb.length; i++) {
    if (e.key === keyVerb[i].button) {
      keyVerb[i].bool = true;
    }
  }
});

document.addEventListener('keyup', (e) => {                
  for (let i = 0; i < keyVerb.length; i++) {
    if (e.key === keyVerb[i].button) {
      keyVerb[i].bool = false;
      keyVerb[i].tween = true;
    }
  }
});
  
// LOCAL RENDER-MACHINE
const moveCar = () => {
  const playerObject = document.getElementById('square');
  
  let carPosition = findCoordinates(playerRotation);                                        
  
  playerObject.style.transform = `rotateZ(${playerRotation*(-1)}deg)`;
  playerObject.style.left = `${playerPosition[1]}px`;
  playerObject.style.top = `${playerPosition[0]}px`;
  
  for (let i = 0; i < keyVerb.length; i++) {
    if (keyVerb[i].bool === true) {                        
      keyVerb[i].action(keyVerb[i].modifier, carPosition.X, carPosition.Y)                                                                               
    } 
    else if (keyVerb[i].tween === true) {
      keyVerb[i].otherAction(keyVerb[i].modifier, carPosition.X, carPosition.Y)
    }
  }; 
};
  
// RENDER STARTER
const startRender = () => {
  setInterval(moveCar, 20)
}