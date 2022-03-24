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

CREATE VIEW shop.supplier_orders AS
SELECT
  suppliers.id,
  orders.quantity,
  orders.price
FROM
  suppliers
  JOIN orders ON suppliers.id = orders.supplier_id
WHERE
  suppliers.name = 'Apple';

GRANT
SELECT
  ON shop.supplier_orders TO PUBLIC;