# TEST SCENARIO 1

- The `source.json` file hasn't declaration of any package.

- The `target.json` file has the declaration of 2 different `package`.
  - The first `json` is referring to a named `employee` package that has no schema and has the declaration of one grant.

  - The second `json` is referring to a named `address` package that has no schema and no grant defined.

## Expected Result

- A file with scripts removing all packages present in the target, since source has no function declaration.
