import sqlGeneration from '../src';

import expectedTest1 from './files/in/table/test_1/expected.json';
import tableSourceTest1 from './files/in/table/test_1/source.json';
import tableTargetTest1 from './files/in/table/test_1/target.json';
import expectedTest2 from './files/in/table/test_2/expected.json';
import tableSourceTest2 from './files/in/table/test_2/source.json';
import tableTargetTest2 from './files/in/table/test_2/target.json';
import expectedTest3 from './files/in/table/test_3/expected.json';
import tableSourceTest3 from './files/in/table/test_3/source.json';
import tableTargetTest3 from './files/in/table/test_3/target.json';
import { writeResult } from './utils/writeResult';

describe('Generate table synchronization scripts', () => {
  it('the initial data model contains tables while the model to be changed has none', () => {
    const tableTest1 = sqlGeneration(
      "Tables",
      "plsql",
      tableSourceTest1,
      tableTargetTest1
    );
    writeResult("./tests/files/out/table/test_1/result.sql", tableTest1);

    expect(tableTest1).toBe(expectedTest1.result);
  });

  it(`the source model has the employee table that does not exist in the target model,
  while the target model has the author table`, () => {
    const tableTest2 = sqlGeneration(
      "Tables",
      "plsql",
      tableSourceTest2,
      tableTargetTest2
    );
    writeResult("./tests/files/out/table/test_2/result.sql", tableTest2);

    expect(tableTest2).toBe(expectedTest2.result);
  });

  it('the source model does not have any tables, while the target model has', () => {
    const tableTest3 = sqlGeneration(
      "Tables",
      "plsql",
      tableSourceTest3,
      tableTargetTest3
    );
    writeResult("./tests/files/out/table/test_3/result.sql", tableTest3);

    expect(tableTest3).toBe(expectedTest3.result);
  });
});
