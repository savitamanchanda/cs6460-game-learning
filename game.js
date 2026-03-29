const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const xPosText = document.getElementById("xPos");
const yPosText = document.getElementById("yPos");
const speedValueText = document.getElementById("speedValue");
const sizeValueText = document.getElementById("sizeValue");
const colorValueText = document.getElementById("colorValue");
const frameCountText = document.getElementById("frameCount");
const orbSpeedValueText = document.getElementById("orbSpeedValue");
const scoreValueText = document.getElementById("scoreValue");
const collisionStatusText = document.getElementById("collisionStatus");

// MODULE 1: Program state
// Values for player state

let playerX = 80;
let playerY = 120;
let playerSize = 40;
let playerSpeed = 5;
let playerColor = "royalblue";

// Values for orb state

let orbX = 120;
let orbY = 300;
let orbRadius = 15;
let orbSpeed = 2.5;
let frameCounter = 0;

// Values for game state

let score = 0;
let collisionHappened = false;

// MODULE 2: Input + conditionals
// keyboard state

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function drawGrid() {
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function drawInstructions() {
  ctx.fillStyle = "#64748b";
  ctx.font = "14px Arial";
  ctx.fillText("Use arrow keys to move the square", 16, 24);
  ctx.fillText("Collect the orange orb to increase score", 16, 44);
}

function drawPlayer() {
  ctx.fillStyle = playerColor;
  ctx.fillRect(playerX, playerY, playerSize, playerSize);

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 2;
  ctx.strokeRect(playerX, playerY, playerSize, playerSize);
}

function drawOrb() {
  ctx.beginPath();
  ctx.fillStyle = "orange";
  ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// conditionals for movement controls

function updatePlayer() {
  if (keys.ArrowUp) {
    playerY -= playerSpeed;
  }

  if (keys.ArrowDown) {
    playerY += playerSpeed;
  }

  if (keys.ArrowLeft) {
    playerX -= playerSpeed;
  }

  if (keys.ArrowRight) {
    playerX += playerSpeed;
  }

  keepPlayerInsideCanvas();
}

// boundary conditionals

function keepPlayerInsideCanvas() {
  if (playerX < 0) {
    playerX = 0;
  }

  if (playerY < 0) {
    playerY = 0;
  }

  if (playerX + playerSize > canvas.width) {
    playerX = canvas.width - playerSize;
  }

  if (playerY + playerSize > canvas.height) {
    playerY = canvas.height - playerSize;
  }
}

// MODULE 3: Game loop + iteration

function updateOrb() {

  orbX += orbSpeed;

  if (orbX + orbRadius > canvas.width || orbX - orbRadius < 0) {
    orbSpeed *= -1;
  }
}

// MODULE 4: Collision + scoring 

function playerTouchesOrb() {
  const orbLeft = orbX - orbRadius;
  const orbRight = orbX + orbRadius;
  const orbTop = orbY - orbRadius;
  const orbBottom = orbY + orbRadius;

  const playerLeft = playerX;
  const playerRight = playerX + playerSize;
  const playerTop = playerY;
  const playerBottom = playerY + playerSize;

  return (
    playerRight > orbLeft &&
    playerLeft < orbRight &&
    playerBottom > orbTop &&
    playerTop < orbBottom
  );
}

function handleCollision() {
  collisionHappened = false;

  if (playerTouchesOrb()) {
    score++;
    collisionHappened = true;
    resetOrbPosition();
  }
}

function resetOrbPosition() {
  const minX = orbRadius;
  const maxX = canvas.width - orbRadius;
  const minY = 80;
  const maxY = canvas.height - orbRadius;

  orbX = Math.floor(Math.random() * (maxX - minX)) + minX;
  orbY = Math.floor(Math.random() * (maxY - minY)) + minY;
}

function updateInfoPanel() {
  xPosText.textContent = playerX;
  yPosText.textContent = playerY;
  speedValueText.textContent = playerSpeed;
  sizeValueText.textContent = playerSize;
  colorValueText.textContent = playerColor;
  frameCountText.textContent = frameCounter;
  orbSpeedValueText.textContent = orbSpeed;
  scoreValueText.textContent = score;
  collisionStatusText.textContent = collisionHappened ? "Yes" : "No";
}

// MODULE 3: Main game loop 
// MODULE 5: Functions

function gameLoop() {
  frameCounter++;

  clearCanvas();
  drawGrid();
  drawInstructions();

  updatePlayer();
  updateOrb();
  handleCollision();

  drawPlayer();
  drawOrb();

  updateInfoPanel();

  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  if (event.key in keys) {
    event.preventDefault();
    keys[event.key] = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key in keys) {
    event.preventDefault();
    keys[event.key] = false;
  }
});

gameLoop();

// MODULE 6: Debugging
// Inspect the functions above to 
// identify why behaviors changes or breaks
