# TEST SCENARIO 1

- The `source.json` file hasn't declaration of any function.

- The `target.json` file has the declaration of 3 different `functions`.
  - The first `json` is referring to a named `get_address` function that has no schema and has the declaration of one grant.

  - The second `json` is referring to a named `isPalindrome` function that has no schema and no grant defined.

  - The third `json` refers to a named function of `fsum` that belongs to the MATH_FUNCTIONS schema and has the declaration of two grants.

## Expected Result

- A file with scripts removing all functions present in the target, since source has no function declaration.
