import sqlGeneration from '../src';

import expectedTest1 from './files/in/procedure/test_1/expected.json';
import procedureSourceTest1 from './files/in/procedure/test_1/source.json';
import procedureTargetTest1 from './files/in/procedure/test_1/target.json';
import expectedTest2 from './files/in/procedure/test_2/expected.json';
import procedureSourceTest2 from './files/in/procedure/test_2/source.json';
import procedureTargetTest2 from './files/in/procedure/test_2/target.json';
import expectedTest3 from './files/in/procedure/test_3/expected.json';
import procedureSourceTest3 from './files/in/procedure/test_3/source.json';
import procedureTargetTest3 from './files/in/procedure/test_3/target.json';
import { writeResult } from './utils/writeResult';

describe('Generate procedure synchronization scripts', () => {
  it('the source data model contains procedure while the model to be changed has none', () => {
    const procedureTest1 = sqlGeneration(
      'Procedures',
      'plsql',
      procedureSourceTest1,
      procedureTargetTest1
    );
    writeResult('./tests/files/out/procedure/test_1/result.sql', procedureTest1);

    expect(procedureTest1).toBe(expectedTest1.result);
  });

  it('the source model has the hello_world procedure, while the target model has the insert_user procedure', () => {
    const procedureTest2 = sqlGeneration(
      'Procedures',
      'plsql',
      procedureSourceTest2,
      procedureTargetTest2
    );
    writeResult('./tests/files/out/procedure/test_2/result.sql', procedureTest2);

    expect(procedureTest2).toBe(expectedTest2.result);
  });

  it(`the source model doesn't have any procedure, while the target model has`, () => {
    const procedureTest3 = sqlGeneration(
      'Procedures',
      'plsql',
      procedureSourceTest3,
      procedureTargetTest3
    );
    writeResult('./tests/files/out/procedure/test_3/result.sql', procedureTest3);

    expect(procedureTest3).toBe(expectedTest3.result);
  });
});
