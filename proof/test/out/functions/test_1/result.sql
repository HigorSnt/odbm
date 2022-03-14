CREATE
OR REPLACE FUNCTION get_address (person_id IN NUMBER) RETURN VARCHAR2 IS
BEGIN
SELECT
  'Name-' || person.first_name || ' ' || person.last_name || ',City-' || address.city || ', State-' || address.state || ',Country-' || address.country || ', ZIP Code-' || address.zip_code INTO person_details
FROM
  person_info person,
  person_address address
WHERE
  person.id = person_id
  AND address.person_id = person.id;

RETURN(person_details);

END get_address;

GRANT EXECUTE ON get_address TO PUBLIC;

CREATE
OR REPLACE FUNCTION isPalindrome (STRING VARCHAR2) RETURN VARCHAR2 IS
BEGIN
SELECT
  REVERSE(STRING) INTO reversedString
FROM
  DUAL;

-- Using UPPER to ignore case sensitivity.
IF UPPER(STRING) = UPPER(reversedString) THEN RETURN('true');

END IF;

RETURN ('false');

END isPalindrome;

CREATE
OR REPLACE FUNCTION MATH_FUNCTIONS.fsum (n1 IN NUMBER, n2 IN NUMBER) RETURN NUMBER IS
BEGIN
  n3 := n1 + n2;

RETURN n3;

END MATH_FUNCTIONS.fsum;

GRANT EXECUTE ON fsum TO PUBLIC;

GRANT DEBUG ON fsum TO user1;