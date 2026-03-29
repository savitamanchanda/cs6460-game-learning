const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const xPosText = document.getElementById("xPos");
const yPosText = document.getElementById("yPos");
const speedValueText = document.getElementById("speedValue");
const sizeValueText = document.getElementById("sizeValue");
const colorValueText = document.getElementById("colorValue");
const frameCountText = document.getElementById("frameCount");
const orbSpeedValueText = document.getElementById("orbSpeedValue");

// MODULE 1: change values here to experiment 

let playerX = 80;
let playerY = 120;
let playerSize = 40;
let playerSpeed = 5;
let playerColor = "royalblue";


// MODULE 3: Values for loop behavior

let orbX = 120;
let orbY = 300;
let orbRadius = 15;
let orbSpeed = 2.5;
let frameCounter = 0;

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

function updatePlayer() {
  // MODULE 2: conditionals for movement controls 
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

  // Boundary conditionals
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

function updateOrb() {
  // MODULE 3: iteration behavior
  orbX += orbSpeed;

  if (orbX + orbRadius > canvas.width || orbX - orbRadius < 0) {
    orbSpeed *= -1;
  }
}

function updateInfoPanel() {
  xPosText.textContent = playerX;
  yPosText.textContent = playerY;
  speedValueText.textContent = playerSpeed;
  sizeValueText.textContent = playerSize;
  colorValueText.textContent = playerColor;
  frameCountText.textContent = frameCounter;
  orbSpeedValueText.textContent = orbSpeed;
}

function gameLoop() {
  frameCounter++;

  clearCanvas();
  drawGrid();
  drawInstructions();

  updatePlayer();
  updateOrb();


  drawPlayer();
  drawOrb();
  
  updateInfoPanel();

  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  if (event.key in keys) {
    keys[event.key] = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key in keys) {
    keys[event.key] = false;
  }
});

gameLoop();
