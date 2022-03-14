CREATE
OR REPLACE PROCEDURE hello_world () AS
BEGIN
  dbms_output.put_line('Hello World!');

EXCEPTION
END hello_world;

CREATE PROCEDURE dashboard.insert_user (id IN NUMBER, NAME IN VARCHAR2) IS
BEGIN
INSERT INTO
  dashboard.user
VALUES
(id, NAME);

EXCEPTION
END dashboard.insert_user;

GRANT EXECUTE ON dashboard.insert_user TO PUBLIC;