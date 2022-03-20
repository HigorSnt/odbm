CREATE
OR REPLACE PROCEDURE hello_world () AS
BEGIN
  dbms_output.put_line('Hello World!');

END hello_world;

GRANT EXECUTE ON hello_world TO PUBLIC;

REVOKE EXECUTE ON dashboard.insert_user
FROM
  PUBLIC;

DROP PROCEDURE dashboard.insert_user;