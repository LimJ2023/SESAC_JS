const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

let snake = [
  {
    x: 0,
    y: 0,
  }, // 초기 뱀 위치
  //길어지면 배열에 추가
];
let food = [];

const blockSize = 20;
let direction = "right"; // 이동방향
const snakeSpped = 200;
const winWidth = 400;
const winHeight = 400;
let score = 0;
let head = { x: snake[0].x, y: snake[0].y };
let tail = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y };

function playGame() {
  score = 0;
  food.push(generateFood());
  setInterval(draw, snakeSpped);
}
const boardSize = winWidth / blockSize;

function draw() {
  ctx.clearRect(0, 0, winWidth, winHeight);
  drawFood();
  drawSnake();
  moveSnake();
  checkEatFood();
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
function drawSnake() {
  ctx.fillStyle = "blue";
  ctx.fillRect(
    snake[0].x * blockSize,
    snake[0].y * blockSize,
    blockSize,
    blockSize
  );
}
function moveSnake() {
  if (direction === "right") {
    snake[0].x = snake[0].x + 1;
  } else if (direction === "left") {
    snake[0].x = snake[0].x - 1;
  } else if (direction === "up") {
    snake[0].y = snake[0].y - 1;
  } else if (direction === "down") {
    snake[0].y = snake[0].y + 1;
  }
  setHead();
  // 화면에서 벗어나면 반대쪽 화면으로 튀어나오게 하기

  //   if (snake[0].x * blockSize > winWidth) {
  //     snake[0].x = 0;
  //   } else if (snake[0].x * blockSize < 0) {
  //     snake[0].x = winWidth / blockSize;
  //   }
  //   if (snake[0].y * blockSize < 0) {
  //     snake[0].y = winHeight / blockSize;
  //   } else if (snake[0].y * blockSize > winHeight) {
  //     snake[0].y = 0;
  //   }

  // 안에 갇혀있게 하기
  if (snake[0].x * blockSize >= winWidth) {
    snake[0].x = (winWidth - blockSize) / blockSize;
  } else if (snake[0].x * blockSize <= 0) {
    snake[0].x = 0;
  }
  if (snake[0].y * blockSize <= 0) {
    snake[0].y = 0;
  } else if (snake[0].y * blockSize >= winHeight) {
    snake[0].y = (winHeight - blockSize) / blockSize;
  }
}

function setHead() {
  head = { x: snake[0].x, y: snake[0].y };
}
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  switch (e.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    // 위내용을 줄일 수 없을까?
  }
});

function checkEatFood() {
  if (head.x === food[0].x && head.y === food[0].y) {
    console.log("먹음");
    score++;
    addSnakeBody();
  }
}
function addSnakeBody() {
    snake.push({x: tail.x, y: tail.y})
}
// 게임 시작. 반복 호출법
playGame();
