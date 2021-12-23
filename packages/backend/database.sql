-- CREATE DATABASE IF NOT EXISTS reeba

CREATE TABLE IF NOT EXISTS users(
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL UNIQUE,
  user_email TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  PRIMARY KEY (user_id)
);
