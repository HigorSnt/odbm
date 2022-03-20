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

REVOKE
SELECT
  ON shop.supplier_orders
FROM
  PUBLIC;

DROP VIEW shop.supplier_orders;