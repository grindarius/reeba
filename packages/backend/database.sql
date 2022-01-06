-- CREATE DATABASE IF NOT EXISTS reeba

CREATE TABLE IF NOT EXISTS users(
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL UNIQUE,
  user_email TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  user_profile_path TEXT NOT NULl DEFAULT './uploads/default-user-profile.png',
  PRIMARY KEY (user_id)
);
