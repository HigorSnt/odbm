import sqlGeneration from '../src';

import expectedTest1 from './files/in/package/test_1/expected.json';
import packageSourceTest1 from './files/in/package/test_1/source.json';
import packageTargetTest1 from './files/in/package/test_1/target.json';
import expectedTest2 from './files/in/package/test_2/expected.json';
import packageSourceTest2 from './files/in/package/test_2/source.json';
import packageTargetTest2 from './files/in/package/test_2/target.json';
import expectedTest3 from './files/in/package/test_3/expected.json';
import packageSourceTest3 from './files/in/package/test_3/source.json';
import packageTargetTest3 from './files/in/package/test_3/target.json';
import { writeResult } from './utils/writeResult';

describe('Generate package synchronization scripts', () => {
  it('the source data model contains packages while the model to be changed has none', () => {
    const packageTest1 = sqlGeneration(
      'Packages',
      'plsql',
      packageSourceTest1,
      packageTargetTest1
    );
    writeResult('./tests/files/out/package/test_1/result.sql', packageTest1);

    expect(packageTest1).toBe(expectedTest1.result);
  });

  it('the source model has the employee package, while the target model has the address package', () => {
    const packageTest2 = sqlGeneration(
      'Packages',
      'plsql',
      packageSourceTest2,
      packageTargetTest2
    );
    writeResult('./tests/files/out/package/test_2/result.sql', packageTest2);

    expect(packageTest2).toBe(expectedTest2.result);
  });

  it(`the source model doesn't have any package, while the target model has`, () => {
    const packageTest3 = sqlGeneration(
      'Packages',
      'plsql',
      packageSourceTest3,
      packageTargetTest3
    );
    writeResult('./tests/files/out/package/test_3/result.sql', packageTest3);

    expect(packageTest3).toBe(expectedTest3.result);
  });
});
