USE PHB;

-- Dummy data for users table
INSERT INTO users (username, password) VALUES
('john_doe', 'password123'),
('jane_smith', 'securepass'),
('alex_jones', 'strongPassword');

-- Dummy data for exercise table
INSERT INTO exercise (username, date, duration, type, steps) VALUES
('john_doe', '2024-03-01', '00:45:00', 'cardio', 5000),
('john_doe', '2024-03-02', '01:00:00', 'strength', 0),
('jane_smith', '2024-03-01', '01:15:00', 'yoga', 0),
('jane_smith', '2024-03-02', '00:50:00', 'cardio', 6000),
('alex_jones', '2024-03-01', '00:30:00', 'pilates', 0),
('alex_jones', '2024-03-02', '01:10:00', 'sport', 0);

-- Dummy data for food table
INSERT INTO food (username, date, fruits, vegetables, protein, grains, dairy) VALUES
('john_doe', '2024-03-01', true, true, true, true, false),
('john_doe', '2024-03-02', true, true, false, true, true),
('jane_smith', '2024-03-01', true, true, false, true, true),
('jane_smith', '2024-03-02', true, true, true, true, true),
('alex_jones', '2024-03-01', true, false, true, true, false),
('alex_jones', '2024-03-02', true, true, true, false, false);

-- Dummy data for wellness table
INSERT INTO wellness (username, date, screen_duration, sleep_duration) VALUES
('john_doe', '2024-03-01', '02:30:00', '08:00:00'),
('john_doe', '2024-03-02', '03:00:00', '07:30:00'),
('jane_smith', '2024-03-01', '02:00:00', '08:30:00'),
('jane_smith', '2024-03-02', '02:30:00', '08:00:00'),
('alex_jones', '2024-03-01', '04:00:00', '07:00:00'),
('alex_jones', '2024-03-02', '03:30:00', '07:30:00');

-- Dummy data for score table
INSERT INTO score (username, date, score_food, score_exercise, score_wellness, recommendation) VALUES
('john_doe', '2024-03-01', 0.8, 0.7, 0.9, 'Increase protein intake for better exercise performance.'),
('john_doe', '2024-03-02', 0.7, 0.8, 0.8, 'Maintain consistency in exercise routine.'),
('jane_smith', '2024-03-01', 0.9, 0.8, 0.7, 'Include more variety in exercises for better results.'),
('jane_smith', '2024-03-02', 0.8, 0.9, 0.8, 'Increase sleep duration for improved wellness.'),
('alex_jones', '2024-03-01', 0.7, 0.6, 0.7, 'Increase vegetable intake for better nutrition.'),
('alex_jones', '2024-03-02', 0.8, 0.7, 0.8, 'Limit screen time before bed for better sleep quality.');
