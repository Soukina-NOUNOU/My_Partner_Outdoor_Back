BEGIN;

DROP TABLE IF EXISTS "event",
"user",
"sport",
"level",
"address",
"message",
"event_has_user",
"user_has_address",
"user_has_sport";

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "picture" TEXT DEFAULT 'http://localhost:4000/images/users/default.jpg',
    "birthday" TEXT,
    "bio" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
  );

CREATE TABLE "sport" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
  );

CREATE TABLE "level" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
  );


CREATE TABLE "address" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "number" INT NOT NULL,
    "street" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
  );


CREATE TABLE "event" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "start_date" TEXT NOT NULL,
  "finish_date" TEXT NOT NULL,
  "start_hour" TEXT NOT NULL,
  "finish_hour" TEXT NOT NULL,
  "nb_participant" INT NOT NULL,
  "equipement" TEXT,
  "price" DECIMAL(12,2),
  "picture" TEXT,
  "organizer_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "sport_id" INT NOT NULL REFERENCES "sport"("id"),
  "level_id" INT NOT NULL REFERENCES "level"("id"),
  "address_id" INT NOT NULL REFERENCES "address"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE "message" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "content" TEXT NOT NULL,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "event_id" INT NOT NULL REFERENCES "event"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE "event_has_user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "event_id" INT NOT NULL REFERENCES "event"("id") ON DELETE CASCADE,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "user_has_address" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "address_id" INT NOT NULL REFERENCES "address"("id") ON DELETE CASCADE
);

CREATE TABLE "user_has_sport" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "sport_id" INT NOT NULL REFERENCES "sport"("id"),
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);


COMMIT;