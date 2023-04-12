BEGIN;

SET client_encoding to UTF8;

INSERT INTO "user"
("firstname", "lastname", "email", "password", "pseudo", "picture", "birthday", "bio")
VALUES
('Thomas', 'Ghys', 'thomas@email.com', 'Pa$$w0rd!', 'TGhys', '/images/profil', '01/02/1980', 'My bio'),
('John', 'Do', 'john@email.com', 'Pa$$w0rd!', 'JDo', '/images/profil', '01/10/2000', 'My bio'),
('Leo', 'Dust', 'leo@email.com', 'Pa$$w0rd!', 'LDust', '/images/profil', '10/02/1990', 'My bio');

INSERT INTO "sport"
("name")
VALUES
('FootBall'),
('VolleyBall'),
('BasketBall'),
('PingPong'),
('Tennis'),
('Velo'),
('Badminton');

INSERT INTO "level"
("name")
VALUES
('Débutant'),
('Intermediaire'),
('Confirmé');

INSERT INTO "address"
("number", "street", "zip_code", "city")
VALUES
(15, 'rue des haricots', '64578', 'Tarbus'),
(24, 'rue des fleurs', '73045', 'Vrellis'),
(01, 'rue des rameaux', '13456', 'Cartou'),
(35, 'rue des ecoles', '80970', 'Poitier');

INSERT INTO "event"
("title", "description", "start_date", "finish_date", "start_hour", "finish_hour", "nb_participant", "equipement", "price", "picture", "organizer_id", "sport_id", "level_id", "address_id")
VALUES
('Event de football', 'Faire un foot 5vs5', '12/05/2023', '12/05/2023', '12:00', '15:00', 10, 'Chaussure crampon', 5.556, '/images/foot', 1, 1, 1, 1),
('Event de BasketBall', 'Faire un Basket', '15/05/2023', '15/05/2023', '15:00', '19:00', 2, '', 0, '/images/basket', 2, 3, 1, 2),
('Event de PingPong', 'Faire un PingPong Beer', '11/05/2023', '12/05/2023', '12:00', '15:00', 10, 'Biere', 10, '/images/pingpong', 3, 4, 3, 3),
('Event de Tennis', 'Faire un tennis', '13/05/2023', '13/05/2023', '10:00', '16:00', 4, 'Raquette et balles', 0, '/images/tennis', 1, 5, 1, 4);


INSERT INTO "message"
("content", "user_id", "event_id")
VALUES
('Hello alors on est en forme ?', 1, 1),
('Hello  on est en forme ?', 1, 2),
('Hello alors  en forme ?', 1, 3),
('Hello  forme ?', 1, 2),
('Hello  ?', 1, 1);

INSERT INTO "event_has_user"
("event_id", "user_id")
VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO "user_has_address"
("user_id", "address_id")
VALUES
(1, 2),
(2, 3),
(3, 4);

INSERT INTO "user_has_sport"
("sport_id", "user_id")
VALUES
(1, 1),
(3, 2),
(4, 3);

COMMIT;