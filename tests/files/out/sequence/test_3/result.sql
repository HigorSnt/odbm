DROP SEQUENCE id_seq;

REVOKE
SELECT
  ON company.engineer_id_seq
FROM
  PUBLIC;

DROP SEQUENCE company.engineer_id_seq;