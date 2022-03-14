CREATE VIEW inventory AS
SELECT
  products.cod_prod,
  products.description
FROM
  products
WHERE
  price < 1000;

GRANT
SELECT
  ON inventory TO PUBLIC;