USE PHB;

INSERT INTO users (username, password) VALUES
('jsmith', 'password123'),
('alicia_lee', 'fitness4life!'),
('david_kim', 'strongman2023');

INSERT INTO exercise (username, date, duration, type) VALUES
('jsmith', '2024-03-02', '00:30:00', 'cardio'),
('alicia_lee', '2024-03-01', '01:00:00', 'yoga'),
('david_kim', '2024-02-28', '00:45:00', 'strength'),
('jsmith', '2024-02-27', '00:45:00', 'sport');

INSERT INTO food (username, date, fruits, vegetables, protein, grains, dairy) VALUES
('jsmith', '2024-03-02', TRUE, FALSE, TRUE, TRUE, FALSE),
('alicia_lee', '2024-03-01', TRUE, TRUE, TRUE, TRUE, FALSE),
('david_kim', '2024-02-28', FALSE, TRUE, TRUE, FALSE, TRUE),
('jsmith', '2024-02-27', FALSE, FALSE, TRUE, TRUE, TRUE);

INSERT INTO food (username, date, fruits, vegetables, protein, grains, dairy) VALUES
('jsmith', '2024-03-02', TRUE, FALSE, TRUE, TRUE, FALSE),
('alicia_lee', '2024-03-01', TRUE, TRUE, TRUE, TRUE, FALSE),
('david_kim', '2024-02-28', FALSE, TRUE, TRUE, FALSE, TRUE),
('jsmith', '2024-02-27', FALSE, FALSE, TRUE, TRUE, TRUE);

