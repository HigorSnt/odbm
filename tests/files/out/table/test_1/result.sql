CREATE TABLE company.employee(
  id NUMBER NOT NULL,
  employee_name VARCHAR2(150) NOT NULL,
  department_id NUMBER NOT NULL,
  CONSTRAINT employee_id_pk PRIMARY KEY (id),
  CONSTRAINT employee_department_id_fk FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE UNIQUE INDEX employee_idx ON company.employee (id, employee_name);

COMMENT ON COLUMN company.employee.id IS 'Employee Id';

COMMENT ON COLUMN company.employee.employee_name IS 'Employee Name';

COMMENT ON COLUMN company.employee.department_id IS 'Employee Department Id';

GRANT
SELECT
  ON company.employee TO PUBLIC;

CREATE TABLE author(
  id NUMBER NOT NULL,
  author_name VARCHAR2(150) NOT NULL,
  birth_date DATE
);

GRANT
SELECT
  ON author TO PUBLIC;