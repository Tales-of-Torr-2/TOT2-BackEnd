DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  google_id TEXT NOT NULL,
  score INT,
  hero_stats JSON,
  held_gear JSON[],
  items JSON[],
  achievements TEXT[],
  location INT,
);