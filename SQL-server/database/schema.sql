DROP DATABASE IF EXISTS qa;

CREATE DATABASE qa;

\c qa;

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY NOT NULL,
  product_id INT,
  body TEXT,
  date_written DATE,
  asker_name TEXT,
  asker_email TEXT,
  reported INT,
  helpful INT
);

CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY NOT NULL,
  a_question_id INT REFERENCES questions (id),
  a_body TEXT,
  a_date DATE,
  answerer_name TEXT,
  answerer_email TEXT,
  a_reported INT,
  a_helpful INT
);

CREATE TABLE answer_photos (
  photo_id SERIAL PRIMARY KEY NOT NULL,
  p_answer_id INT REFERENCES answers (id), 
  url TEXT
);