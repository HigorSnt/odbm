DROP PACKAGE employee;

REVOKE EXECUTE ON employee
FROM
  PUBLIC;

DROP PACKAGE company.address;

REVOKE EXECUTE ON company.address
FROM
  PUBLIC;