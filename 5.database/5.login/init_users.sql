CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    email TEXT,
    created_at DATE DEFAULT CURRENT_TIMESTAMP, -- 기본값 현재 시간
    role TEXT DEFAULT 'user'
);


-- 초기 데이터 삽입
INSERT INTO users (username, password, email, role) VALUES 
    ('admin', 'aaffddsss!@@!','admin@gamil.com','admin'),
    ('user1', 'pass1','user1@gamil.com','user'),
    ('user2', 'pass2','user2@gamil.com','user'),
    ('user3', 'pass3','user3@gamil.com','user'),
    ('amino014', 'passa','heuristic2022@gamil.com','admin');