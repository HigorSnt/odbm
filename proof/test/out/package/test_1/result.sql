CREATE
OR REPLACE PACKAGE employee AS FUNCTION getFullName(employee_id NUMBER) RETURN VARCHAR2;

FUNCTION get_salary(employee_id NUMBER) RETURN NUMBER;

END employee;

GRANT EXECUTE ON employee TO PUBLIC;

CREATE
OR REPLACE PACKAGE company.address AS FUNCTION getEmployeeAddress(employee_id NUMBER) RETURN VARCHAR2;

END company.address;