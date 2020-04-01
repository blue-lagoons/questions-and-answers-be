DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

\c questions_answers;

CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  product_id INT,
  body TEXT,
  date_written TEXT,
  asker_name TEXT,
  asker_email TEXT,
  reported INT,
  helpful INT
);

CREATE TABLE answers (
  id INTEGER PRIMARY KEY,
  question_id INT,
  body TEXT,
  date_written TEXT,
  answerer_name TEXT,
  answerer_email TEXT,
  reported INT,
  helpful INT
);

CREATE TABLE answer_photos (
  id INTEGER PRIMARY KEY,
  answers_id INT,
  url TEXT
);