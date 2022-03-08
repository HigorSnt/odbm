# TEST SCENARIO 1

- The `source.json` file has the declaration of 3 different `types`.
  - The first `json` is referring to a named `phone` type that has no schema and no grant defined.

  - The second `json` refers to a named type of `order_item_list` that belongs to the SHOP schema and has the declaration of one grant.

  - The third `json` refers to a named type of `employee` that has no schema and has the declaration of two grants.

- The `target.json` file hasn't declaration of any type.

## Expected Result

- A file with the scripts creating all the types and their grants present in the `source.json` file.
