USE PHB;

-- Dummy data for users table
INSERT INTO users (username, password, first_name, last_name) VALUES
('john_doe@gmail.com', '123', 'John', 'Doe'),
('jane_smith@gmail.com', 'securepass', 'Jane', 'Smith'),
('alex_jones@gmail.com', 'strongPassword', 'Alex', 'Jones');

-- Dummy data for exercise table
INSERT INTO exercise (username, date, duration, type, steps) VALUES
('john_doe@gmail.com', '2024-03-10', 45, 'cardio', 5000),
('john_doe@gmail.com', '2024-03-09', 60, 'strength', 0),
('jane_smith@gmail.com', '2024-03-10', 75, 'yoga', 0),
('jane_smith@gmail.com', '2024-03-09', 50, 'cardio', 6000),
('alex_jones@gmail.com', '2024-03-10', 30, 'pilates', 0),
('alex_jones@gmail.com', '2024-03-09', 70, 'sport', 0);

-- Dummy data for food table
INSERT INTO food (username, date, fruits, vegetables, protein, grains, dairy) VALUES
('john_doe@gmail.com', '2024-03-10', true, true, true, true, false),
('john_doe@gmail.com', '2024-03-09', true, true, false, true, true),
('jane_smith@gmail.com', '2024-03-10', true, true, false, true, true),
('jane_smith@gmail.com', '2024-03-09', true, true, true, true, true),
('alex_jones@gmail.com', '2024-03-10', true, false, true, true, false),
('alex_jones@gmail.com', '2024-03-09', true, true, true, false, false);

-- Dummy data for wellness table
INSERT INTO wellness (username, date, screen_duration, sleep_duration) VALUES
('john_doe@gmail.com', '2024-03-10', 8.5, 6.2),
('john_doe@gmail.com', '2024-03-09', 2.1, 7.4),
('jane_smith@gmail.com', '2024-03-10', 1.1, 9.0),
('jane_smith@gmail.com', '2024-03-09', 12.0, 2.5),
('alex_jones@gmail.com', '2024-03-10', 9.1, 5.6),
('alex_jones@gmail.com', '2024-03-09', 7.3, 7.7);

-- Dummy data for score table
INSERT INTO score (username, date, total_score, score_food, score_exercise, score_wellness, recommendation) VALUES
('john_doe@gmail.com', '2024-03-10', 80, 25, 30, 25, 'Increase protein intake for better exercise performance.'),
('john_doe@gmail.com', '2024-03-09', 75, 20, 30, 75, 'Maintain consistency in exercise routine.'),
('jane_smith@gmail.com', '2024-03-10', 90, 35, 30, 12, 'Include more variety in exercises for better results.'),
('jane_smith@gmail.com', '2024-03-09', 85, 30, 30, 88, 'Increase sleep duration for improved wellness.'),
('alex_jones@gmail.com', '2024-03-10', 70, 20, 25, 91, 'Increase vegetable intake for better nutrition.'),
('alex_jones@gmail.com', '2024-03-09', 78, 25, 28, 25, 'Limit screen time before bed for better sleep quality.');
