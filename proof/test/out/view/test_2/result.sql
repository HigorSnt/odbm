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

DROP VIEW shop.supplier_orders;

REVOKE
SELECT
  ON shop.inventory
FROM
  PUBLIC;