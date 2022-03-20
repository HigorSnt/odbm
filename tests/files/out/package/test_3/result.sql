REVOKE EXECUTE ON employee
FROM
  PUBLIC;

DROP PACKAGE employee;

REVOKE EXECUTE ON company.address
FROM
  PUBLIC;

DROP PACKAGE company.address;