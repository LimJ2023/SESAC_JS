// 점수 표시
function createScoreboard() {
  const scoreboard = document.createElement('div');
  scoreboard.id = 'scoreboard';
  scoreboard.style.position = 'absolute';
  scoreboard.style.right = '20px';
  scoreboard.style.top = '20px';
  scoreboard.style.padding = '10px';
  scoreboard.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  scoreboard.style.color = 'white';
  document.body.appendChild(scoreboard);
}

// 점수 업데이트
function updateScoreboard(scores) {
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = '<h3>점수판</h3>';
  scores.sort((a, b) => b.score - a.score); // 높은 점수순으로 정렬
  
  scores.forEach(player => {
    const scoreElement = document.createElement('div');
    scoreElement.style.color = player.color;
    scoreElement.textContent = `${player.userName}: ${player.score}점`;
    scoreboard.appendChild(scoreElement);
  });
}

// WebSocket 메시지 처리
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch(data.type) {
    case "update":
      // ... existing game update code ...
      if (data.scores) {
        updateScoreboard(data.scores);
      }
      break;
    
    case "scoreUpdate":
      // 개별 점수 업데이트 처리
      break;
      
    case "end":
      alert(data.message); // 게임 종료 메시지 표시
      break;
      
    // ... other cases ...
  }
};

// 게임 초기화 시 점수판 생성
function initGame() {
  createScoreboard();
  // ... existing initialization code ...
} 