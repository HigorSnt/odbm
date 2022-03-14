CREATE TABLE company.employee(
  id NUMBER,
  NAME VARCHAR2,
  department_id NUMBER,
  CONSTRAINT employee_id_pk PRIMARY KEY (id),
  CONSTRAINT employee_department_id_fk FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE UNIQUE INDEX employee_idx ON company.employee (id, NAME);

COMMENT ON COLUMN employee.id IS 'Employee Id';

COMMENT ON COLUMN employee.name IS 'Employee Name';

COMMENT ON COLUMN employee.department_id IS 'Employee Department Id';