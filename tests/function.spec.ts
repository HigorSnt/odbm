import sqlGeneration from '../src';

import expectedTest1 from './files/in/functions/test_1/expected.json';
import functionsSourceTest1 from './files/in/functions/test_1/source.json';
import functionsTargetTest1 from './files/in/functions/test_1/target.json';
import expectedTest2 from './files/in/functions/test_2/expected.json';
import functionsSourceTest2 from './files/in/functions/test_2/source.json';
import functionsTargetTest2 from './files/in/functions/test_2/target.json';
import expectedTest3 from './files/in/functions/test_3/expected.json';
import functionsSourceTest3 from './files/in/functions/test_3/source.json';
import functionsTargetTest3 from './files/in/functions/test_3/target.json';
import { writeResult } from './utils/writeResult';

describe('Generate function synchronization scripts', () => {
  it('the initial data model contains functions while the model to be changed has none', () => {
    const functionTest1 = sqlGeneration(
      "Functions",
      "plsql",
      functionsSourceTest1,
      functionsTargetTest1
    );
    writeResult("./tests/files/out/function/test_1/result.sql", functionTest1);

    expect(functionTest1).toBe(expectedTest1.result);
  });

  it(`the source model has the functions get_address, isPalindrome, fsum and fdiv,
  while the target model has the functions get_address, fsum, fsub`, () => {
    const functionTest2 = sqlGeneration(
      "Functions",
      "plsql",
      functionsSourceTest2,
      functionsTargetTest2
    );

    writeResult("./tests/files/out/function/test_2/result.sql", functionTest2);

    expect(functionTest2).toBe(expectedTest2.result);
  });

  it(`the source model doesn't have any functions, while the target model has`, () => {
    const functionTest3 = sqlGeneration(
      "Functions",
      "plsql",
      functionsSourceTest3,
      functionsTargetTest3
    );
    writeResult("./tests/files/out/function/test_3/result.sql", functionTest3);

    expect(functionTest3).toBe(expectedTest3.result);
  });
});
