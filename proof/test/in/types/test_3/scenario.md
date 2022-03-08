# TEST SCENARIO 1

- The `source.json` file hasn't declaration of any type.

- The `target.json` file has the declaration of 3 different `types`.
  - The first `json` is referring to a named `phone` type that has no schema and no grant defined.

  - The second `json` refers to a named type of `order_item_list` that belongs to the SHOP schema and has the declaration of one grant.

  -  The third `json` refers to a named type of `employee` that has no schema and has the declaration of two grants.


## Expected Result

- A file with scripts removing all types present in the target, since source has no type declaration.
