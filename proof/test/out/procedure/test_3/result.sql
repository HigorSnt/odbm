DROP PROCEDURE hello_world;

DROP PROCEDURE dashboard.insert_user;

REVOKE EXECUTE ON dashboard.insert_user
FROM
  PUBLIC;