DROP DATABASDE IF EXISTS PHB;
CREATE DATABASE PHB;
USE PHB;

CREATE TABLE users (
	username 					VARCHAR(50) NOT NULL PRIMARY KEY,
    password 					VARCHAR(50) NOT NULL
);

CREATE TABLE excercise (
    username 					VARCHAR(50),
    date 						DATE NOT NULL,
    duration 					TIME,
    type 						SET("cardio", "strength", "yoga", "sport", "pilates"),
    steps 						INT NOT NULL,
    PRIMARY KEY (username, date)
    FOREIGN KEY (username) 		REFERENCES users(username),
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
    FOREIGN KEY (username) 		REFERENCES users(username),
);

CREATE TABLE wellness (
    username 					VARCHAR(50),
    date 						DATE NOT NULL,
    screen_duration 			TIME,
    sleep_duration 				TIME,
    PRIMARY KEY (username, date),
    FOREIGN KEY (username) 		REFERENCES users(username),
);

CREATE TABLE score (
    username 					VARCHAR(50),
    date 						DATE NOT NULL,
    score_food				    FLOAT NOT NULL,
    score_exercise			    FLOAT NOT NULL,
    score_wellness 				FLOAT NOT NULL,
    recommendation 				VARCHAR(100),
    PRIMARY KEY (username, date),
    FOREIGN KEY (username) 		REFERENCES users(username),
);