CREATE TRIGGER university.check_age BEFORE
INSERT
  OR
UPDATE
  ON student FOR EACH ROW ENABLE
BEGIN
  IF :NEW.age > 90 THEN raise_application_error(-20001, 'Age should not be greater than 90');

END IF;

END;

DROP TRIGGER user_updated_at_column;