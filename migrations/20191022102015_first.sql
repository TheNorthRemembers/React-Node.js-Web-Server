---!> MARINER:MIGRATE:UP:
BEGIN;

-- Place your up migrations here
CREATE TABLE useless (
  id SERIAL NOT NULL PRIMARY KEY,
  some_number integer NOT NULL
);

COMMIT;

---!> MARINER:MIGRATE:DOWN:
BEGIN;

DROP TABLE useless;

COMMIT;