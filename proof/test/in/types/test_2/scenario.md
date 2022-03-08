# TEST SCENARIO 1

- The `source.json` file has the declaration of 3 different `types`.
  - The first `json` is referring to a named `phone` type that has no schema and no grant defined.

  - The second `json` refers to a named type of `order_item_list` that belongs to the SHOP schema and has the declaration of one grant.

  - The third `json` refers to a named type of `employee` that has no schema and has the declaration of two grants.

- The `target.json` file has the declaration of 3 different `types`.
  - The first `json` is referring to a named `address` type that has no schema and has the declaration of one grant.

  - The second `json` refers to a named type of `order_item_list` that belongs to the SHOP schema and has the declaration of one grant.

  - The third `json` refers to a named type of `employee` that has no schema and has the declaration of two grants.

## Expected Result

- A file with the script excluding the `address` type and the declared grant and creating the `phone` type present only in `source.json`
