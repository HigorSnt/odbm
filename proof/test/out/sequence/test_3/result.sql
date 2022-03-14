DROP SEQUENCE id_seq;

DROP SEQUENCE company.engineer_id_seq;

REVOKE
SELECT
  ON company.engineer_id_seq
FROM
  PUBLIC;