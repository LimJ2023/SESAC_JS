function moveSnake(snake) {
  const head = { ...snake.body[0] };
  
  switch (snake.direction) {
    case "up":
      head.y -= 1;
      break;
    case "down":
      head.y += 1;
      break;
    case "left":
      head.x -= 1;
      break;
    case "right":
      head.x += 1;
      break;
  }

  snake.body.unshift(head);
  snake.body.pop();
  
  return head;
}

const blockSize = 20;
const winWidth = 600;
const winHeight = 600;
const boardSize = winWidth / blockSize;
function checkEndGame(body, head, boardSize) {
  return checkWallCollision(head, boardSize) || checkBodyCollision(body);
}
function checkBodyCollision(body) {
  const head = body[0];
  // 머리와 같은 위치에 있는 모든 신체 부분을 찾습니다
  const bodyCollisions = body.filter((segment, index) => 
    // 첫 번째 요소(머리)는 제외하고 검사
    index !== 0 && head.x === segment.x && head.y === segment.y
  );
  
  // 충돌하는 신체 부분이 있으면 true 반환
  return bodyCollisions.length > 0;
}

function generateFood() {
  const x = Math.floor(Math.random() * boardSize);
  const y = Math.floor(Math.random() * boardSize);
  return { x, y };
}

// 벽 충돌 �크 추가
function checkWallCollision(head, boardSize) {
  return (
    head.x < 0 || 
    head.x >= boardSize || 
    head.y < 0 || 
    head.y >= boardSize
  );
}

module.exports = { moveSnake, generateFood, checkEndGame };
