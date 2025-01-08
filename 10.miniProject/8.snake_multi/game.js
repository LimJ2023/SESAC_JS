function moveSnake(snake) {
  const { direction, body, isDead } = snake;
  if(isDead) return snake;
  const head = { x: body[0].x, y: body[0].y };
  if (direction === "right") {
    head.x += 1;
  } else if (direction === "left") {
    head.x -= 1;
  } else if (direction === "up") {
    head.y -= 1;
  } else if (direction === "down") {
    head.y += 1;
  }
  body.unshift(head);
  body.pop();
  return { ...snake, body };
}

const blockSize = 20;
const winWidth = 400;
const winHeight = 400;

function checkEndGame(body) {
  // 게임오버
  if (
    body[0].x * blockSize > winWidth ||
    body[0].x * blockSize < 0 ||
    body[0].y * blockSize < 0 ||
    body[0].y * blockSize > winHeight ||
    checkBodyCollision(body)
  ) {
    return true;
  }
  return false;
}
function checkBodyCollision(body) {
  const head = body[0];
  const hitBody = body.find((b) => head.x === b.x && head.y === b.y);
  if (body.length > 1 && hitBody) {
    return true;
  } else {
    return false;
  }
}

function generateFood() {
  const x = Math.floor(Math.random() * boardSize);
  const y = Math.floor(Math.random() * boardSize);
  return { x, y };
}

module.exports = { moveSnake, generateFood, checkEndGame };
