const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const scoreDiv = document.getElementById("score");
let snake = [
  {
    x: 5,
    y: 5,
  }, // 초기 뱀 위치
  //길어지면 배열에 추가
];
let food = [];

const blockSize = 20;
let direction = "right"; // 이동방향
let newDirection = "";
const snakeSpped = 200;
const winWidth = 400;
const winHeight = 400;
let score = 0;
let head = { x: snake[0].x, y: snake[0].y };
let tail;
const boardSize = winWidth / blockSize;

const game = setInterval(draw, snakeSpped);

function playGame() {
  score = 0;
  food = [];
  food.push(generateFood());
}

function draw() {
  ctx.clearRect(0, 0, winWidth, winHeight);
  drawFood();
  drawSnake(snakeColor);
  moveSnake();
  checkEatFood();
}
function checkEndGame() {
  // 게임오버
  if (
    snake[0].x * blockSize > winWidth ||
    snake[0].x * blockSize < 0 ||
    snake[0].y * blockSize < 0 ||
    snake[0].y * blockSize > winHeight ||
    checkBodyCollision()
  ) {
    console.log("게임오버");
    scoreDiv.innerText = score + "점";
    clearInterval(game);
  }
}
function generateFood() {
  const x = Math.floor(Math.random() * boardSize);
  const y = Math.floor(Math.random() * boardSize);
  return { x, y };
}
function drawFood() {
  food.forEach((f) => {
    ctx.fillStyle = "red";
    ctx.fillRect(f.x * blockSize, f.y * blockSize, blockSize, blockSize);
  });
}
function drawSnake(snakeColor) {
  ctx.fillStyle = snakeColor;
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(
      snake[i].x * blockSize,
      snake[i].y * blockSize,
      blockSize,
      blockSize
    );
  }
}
function moveSnake(direction) {
  tail = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y };
  head = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") {
    head.x += 1;
  } else if (direction === "left") {
    head.x -= 1;
  } else if (direction === "up") {
    head.y -= 1;
  } else if (direction === "down") {
    head.y += 1;
  }

  checkEndGame();

  snake.unshift(head);
  snake.pop();
  // 안에 갇혀있게 하기
  // if (snake[0].x * blockSize >= winWidth) {
  //   snake[0].x = (winWidth - blockSize) / blockSize;
  // } else if (snake[0].x * blockSize <= 0) {
  //   snake[0].x = 0;
  // }
  // if (snake[0].y * blockSize <= 0) {
  //   snake[0].y = 0;
  // } else if (snake[0].y * blockSize >= winHeight) {
  //   snake[0].y = (winHeight - blockSize) / blockSize;
  // }
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
});

function checkBodyCollision() {
  const hitBody = snake.find((body) => head.x === body.x && head.y === body.y);
  console.log(hitBody);
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
// 게임 시작. 반복 호출법
playGame();
