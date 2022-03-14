CREATE
OR REPLACE PROCEDURE hello_world () AS
BEGIN
  dbms_output.put_line('Hello World!');

EXCEPTION
END hello_world;

GRANT EXECUTE ON hello_world TO PUBLIC;

DROP PROCEDURE dashboard.insert_user;

REVOKE EXECUTE ON dashboard.insert_user
FROM
  PUBLIC;