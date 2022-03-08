# TEST SCENARIO 1

- The `source.json` file has the declaration of 4 different `functions`.
  - The first `json` is referring to a named `get_address` function that has no schema and has the declaration of one grant.

  - The second `json` is referring to a named `isPalindrome` function that has no schema and no grant defined.

  - The third `json` refers to a named function of `fsum` that belongs to the MATH_FUNCTIONS schema and has the declaration of two grants.

  - The fourth `json` refers to a named function of `fdiv` that belongs to the MATH_FUNCTIONS schema and has the declaration of two grants.

- The `target.json` file has the declaration of 3 different `functions`.
  - The first `json` is referring to a named `get_address` function that has no schema and has the declaration of one grant.

  - The third `json` refers to a named function of `fsum` that belongs to the MATH_FUNCTIONS schema and has the declaration of two grants.

  - The third `json` refers to a named function of `fsub` that belongs to the MATH_FUNCTIONS schema and has the declaration of two grants.

## Expected Result

- A file with the scripts removing the function `fsub` and it's grants, in addition to a script creating a function `fdiv` and it's grants.
