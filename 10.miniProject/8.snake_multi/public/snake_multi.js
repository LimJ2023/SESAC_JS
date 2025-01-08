const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const scoreDiv = document.getElementById("score");
const socket = new WebSocket("ws://localhost:8000/snake");
const eventSource = new EventSource("/snake");

socket.addEventListener("open", (event) => {
  console.log("서버에 연결됨");
  socket.send(JSON.stringify({ userName: "1번", type: "start" }));
});

let winWidth;
let winHeight;
let blockSize;
let boardSize;
let snakes;
let food;
let score;
let direction;
let newDirection;

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("서버에서 받은 데이터", data);
  if(data.type === "start"){
    winWidth = data.winWidth;
    winHeight = data.winHeight;
    blockSize = data.blockSize;
    boardSize = data.boardSize;
  }
  if(data.type === "update"){
    snakes = new Map(Object.entries(data.snakes));
    food = data.food;
    draw();
  }
  if(data.type === "end"){
    
  }
});

function draw() {
  ctx.clearRect(0, 0, winWidth, winHeight);
  drawFood();
  for(const snake of snakes.values()){
    drawSnake(snake);
  }
}

function drawFood() {
  food.forEach((f) => {
    ctx.fillStyle = "red";
    ctx.fillRect(f.x * blockSize, f.y * blockSize, blockSize, blockSize);
  });
}

function drawSnake(snake) {
  const { color, body } = snake;
  ctx.fillStyle = color;
  for (const b of body) {
    ctx.fillRect(
      b.x * blockSize,
      b.y * blockSize,
      blockSize,
      blockSize
    );
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      newDirection = "up";
      break;
    case "ArrowDown":
      newDirection = "down";
      break;
    case "ArrowRight":
      newDirection = "right";
      break;
    case "ArrowLeft":
      newDirection = "left";
      break;
  }
  if (checkDirection()) {
    direction = newDirection;
  }
  socket.send(
    JSON.stringify({ userName: "1번", type: "keypress", direction: direction })
  );
});

function checkBodyCollision() {
  const hitBody = snake.find((body) => head.x === body.x && head.y === body.y);
  if (snake.length > 1 && hitBody) {
    return true;
  } else {
    return false;
  }
}
function checkDirection() {
  if (
    (direction === "left" && newDirection === "right") ||
    (direction === "right" && newDirection === "left") ||
    (direction === "up" && newDirection === "down") ||
    (direction === "down" && newDirection === "up")
  ) {
    return false;
  } else {
    return true;
  }
}
function checkEatFood() {
  if (head.x === food[0].x && head.y === food[0].y) {
    score++;
    //먹을시 몸통 추가
    addSnakeBody(tail.x, tail.y);
    score++;
    scoreDiv.innerText = score + "점";
    food.pop();
    food.push(generateFood());
  }
}
function addSnakeBody({ x, y }) {
  snake.push({ x, y });
}
