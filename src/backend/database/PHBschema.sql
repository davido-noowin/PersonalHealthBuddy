DROP DATABASE IF EXISTS PHB;
CREATE DATABASE PHB;
USE PHB;

CREATE TABLE users (
	username 					VARCHAR(50) NOT NULL PRIMARY KEY,
    password 					VARCHAR(50) NOT NULL,
    first_name 					VARCHAR(50) NOT NULL,
    last_name					VARCHAR(50) NOT NULL,
    age							INT,
    height						FLOAT,
    weight						FLOAT
);

CREATE TABLE exercise (
    username 					VARCHAR(50),
    date 						DATE NOT NULL,
    duration 					INT,
    type 						SET("cardio", "strength", "yoga", "sport", "pilates"),
    steps 						INT NOT NULL,
    PRIMARY KEY (username, date),
    FOREIGN KEY (username) 		REFERENCES users(username)
);

CREATE TABLE food (
    username 					VARCHAR(50),
    date 						DATE NOT NULL,
    fruits 				        BOOLEAN,
    vegetables 					BOOLEAN,
    protein 					BOOLEAN,
    grains 						BOOLEAN,
    dairy 						BOOLEAN,
    PRIMARY KEY (username, date),
    FOREIGN KEY (username) 		REFERENCES users(username)
);

CREATE TABLE wellness (
    username 					VARCHAR(50),
    date 						DATE NOT NULL,
    screen_duration 			FLOAT,
    sleep_duration 				FLOAT,
    PRIMARY KEY (username, date),
    FOREIGN KEY (username) 		REFERENCES users(username)

);

CREATE TABLE score (
    username 					VARCHAR(50),
    date 						DATE NOT NULL,
    total_score					INT NOT NULL,
    score_food				    INT NOT NULL,
    score_exercise			    INT NOT NULL,
    score_wellness 				INT NOT NULL,
    recommendation 				VARCHAR(100),
    PRIMARY KEY (username, date),
    FOREIGN KEY (username) 		REFERENCES users(username)
);
