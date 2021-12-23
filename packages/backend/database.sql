-- CREATE DATABASE IF NOT EXISTS reeba

CREATE TABLE IF NOT EXISTS users(
  user_id VARCHAR(100) NOT NULL,
  user_name VARCHAR(15) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);
