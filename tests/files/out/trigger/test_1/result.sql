CREATE
OR REPLACE TRIGGER user_updated_at_column BEFORE
UPDATE
  ON USER FOR EACH ROW ENABLE
BEGIN
  UPDATE_AT_COLUMN()
END;

CREATE
OR REPLACE TRIGGER university.check_age BEFORE
INSERT
  OR
UPDATE
  ON student FOR EACH ROW DISABLE
BEGIN
  IF :NEW.age > 90 THEN raise_application_error(-20001, 'Age should not be greater than 90');

END IF;

END;