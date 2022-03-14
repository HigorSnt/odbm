CREATE
OR REPLACE PACKAGE employee AS FUNCTION getFullName(employee_id NUMBER) RETURN VARCHAR2;

FUNCTION get_salary(employee_id NUMBER) RETURN NUMBER;

END employee;

GRANT EXECUTE ON employee TO PUBLIC;

DROP PACKAGE company.address;

REVOKE EXECUTE ON company.address
FROM
  PUBLIC;