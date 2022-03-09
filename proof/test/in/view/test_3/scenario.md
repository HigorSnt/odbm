# TEST SCENARIO 1

- The `source.json` file hasn't declaration of any view.

- The `target.json` file has the declaration of 2 different `views`.
  - The first `json` is referring to a named `inventory` view that has no schema and has the declaration of one grant.

  - The second `json` refers to a named type of `supplier_orders` that belongs to the SHOP schema and no grant defined.

## Expected Result

- A file with scripts removing all functions present in the target, since source has no view declaration.
