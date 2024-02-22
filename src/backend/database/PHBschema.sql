CREATE DATABASE IF NOT EXISTS PHB;
USE PHB;

CREATE TABLE users (
	user_id 					INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email 						VARCHAR(50) NOT NULL,
    first_name 					VARCHAR(50) NOT NULL,
    last_name 					VARCHAR(50) NOT NULL,
    age 						INTEGER,
    height 						FLOAT,
    weight 						FLOAT,
    password 					VARCHAR(50) NOT NULL
);

CREATE TABLE exercise (
	exercise_id 				INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category 					VARCHAR(50)
);

CREATE TABLE exercise_log (
	exercise_log_id 			INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id 					INTEGER,
    exercise_id 				INTEGER,
    FOREIGN KEY (user_id) 		REFERENCES users(user_id),
    FOREIGN KEY (exercise_id) 	REFERENCES exercise(exercise_id),
    date 						DATE NOT NULL,
    duration 					TIME NOT NULL,
    amount 						INTEGER NOT NULL
);

CREATE TABLE nutrient (
	nutrient_id 				INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	category 					VARCHAR(50)
);

CREATE TABLE nutrient_log (
	nutrient_log_id 			INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id 					INTEGER,
    nutrient_id 				INTEGER,
    FOREIGN KEY (user_id) 		REFERENCES users(user_id),
    FOREIGN KEY (nutrient_id) 	REFERENCES nutrient(nutrient_id),
    date 						DATE NOT NULL,
    amount 						FLOAT NOT NULL
);

CREATE TABLE wellness_log (
	wellness_log_id 			INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id 					INTEGER,
    FOREIGN KEY (user_id) 		REFERENCES users(user_id),
    date 						DATE NOT NULL,
    screen_duration 			TIME,
    feeling 					SET("happy", "sad", "neutral"),
    sleep_start 				TIME,
    sleep_end 					TIME
);

CREATE TABLE user_score_log (
log_id 							INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
user_id 						INTEGER,
FOREIGN KEY (user_id) 			REFERENCES users(user_id),
exercise_score 					FLOAT,
nutrient_score 					FLOAT,
wellness_score					FLOAT,
total_score 					FLOAT,
date 							DATE
);
