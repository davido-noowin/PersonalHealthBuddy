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
    duration 					TIME NOT NULL,
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
    mood 					    SET("happy", "sad", "neutral"),
    PRIMARY KEY (username, date),
    FOREIGN KEY (username) 		REFERENCES users(username),
);

CREATE TABLE score (
    username 					VARCHAR(50),
    date 						DATE NOT NULL,
    score_exercise 				INTEGER NOT NULL,
    score_food 				    INTEGER NOT NULL,
    score_wellness 				INTEGER NOT NULL,
    PRIMARY KEY (username, date),
    FOREIGN KEY (username) 		REFERENCES users(username),
);