# TEST SCENARIO 1

- The `source.json` file has the declaration of 1 `package`.
  - The `json` is referring to a named `employee` package that has no schema and has the declaration of one grant.

- The `target.json` file hasn't declaration of any package.
  - The second `json` is referring to a named `address` package that belongs to the COMPANY schema and no grant defined.

## Expected Result

- A file with scripts removing all packages from the target and creating those present in the source.
