CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
     username TEXT, 
     password TEXT
);


-- 초기 데이터 삽입
INSERT INTO users (username, password) VALUES 
    ('admin', 'aaffddsss!@@!'),
    ('user1', 'pass1'),
    ('user2', 'pass2');