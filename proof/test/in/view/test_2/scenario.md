# TEST SCENARIO 1

- The `source.json` file has the declaration of 1 `view`.
  - The `json` refers to a named view `inventory` that has no schema and has the declaration of one grant.

- The `target.json` file has the declaration of 1 `view`.
  - The `json` refers to a named view `supplier_orders` that belongs to the SHOP schema and no grant defined.

## Expected Result

- A scripted file removing the view and grant described in the target object and creating the view and grant described in the source object.
