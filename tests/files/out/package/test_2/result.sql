CREATE
OR REPLACE PACKAGE employee AS FUNCTION get_full_name(employee_id NUMBER) RETURN VARCHAR2;

FUNCTION get_salary(employee_id NUMBER) RETURN NUMBER;

END employee;

GRANT EXECUTE ON employee TO PUBLIC;

REVOKE EXECUTE ON company.address
FROM
  PUBLIC;

DROP PACKAGE company.address;