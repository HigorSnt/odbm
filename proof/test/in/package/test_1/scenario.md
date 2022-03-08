# TEST SCENARIO 1

- The `source.json` file has the declaration of 2 different `package`.
  - The first `json` is referring to a named `employee` package that has no schema and has the declaration of one grant.

  - The second `json` is referring to a named `address` package that belongs to the COMPANY schema and no grant defined.

- The `target.json` file hasn't declaration of any package.

## Expected Result

- A file with the scripts creating all the packages and their grants present in the `source.json` file.
