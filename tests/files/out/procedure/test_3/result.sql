DROP PROCEDURE hello_world;

REVOKE EXECUTE ON dashboard.insert_user
FROM
  PUBLIC;

DROP PROCEDURE dashboard.insert_user;