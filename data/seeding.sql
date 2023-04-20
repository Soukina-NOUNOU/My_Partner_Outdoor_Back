BEGIN;

SET client_encoding to UTF8;

INSERT INTO "sport"
("name")
VALUES
('Randonnée'),
('Course à pied'),
('Trail'),
('Triathlon'),
('VTT'),
('Cyclisme'),
('BMX'),
('Escalade'),
('Via ferrata'),
('Canyoning'),
('Rafting'),
('Kayak'),
('Stand-up paddle'),
('Voile'),
('Kite-surf'),
('Ski'),
('Snowboard'),
('Airsoft'),
('Paintball'),
('Plongée'),
('Volley-ball'),
('Parapente'),
('Tir à l’arc'),
('Ski nautique'),
('Wakeboard'),
('Surf'),
('Football'),
('Rugby'),
('Basket-ball'),
('Handball');

INSERT INTO "level"
("name")
VALUES
('Débutant'),
('Intermédiaire'),
('Confirmé');

COMMIT;