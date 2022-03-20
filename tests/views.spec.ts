import sqlGeneration from '../src';

import expectedTest1 from './files/in/view/test_1/expected.json';
import viewSourceTest1 from './files/in/view/test_1/source.json';
import viewTargetTest1 from './files/in/view/test_1/target.json';
import expectedTest2 from './files/in/view/test_2/expected.json';
import viewSourceTest2 from './files/in/view/test_2/source.json';
import viewTargetTest2 from './files/in/view/test_2/target.json';
import expectedTest3 from './files/in/view/test_3/expected.json';
import viewSourceTest3 from './files/in/view/test_3/source.json';
import viewTargetTest3 from './files/in/view/test_3/target.json';
import { writeResult } from './utils/writeResult';

describe('Generate view synchronization scripts', () => {
  it('the source data model contains views while the model to be changed has none', () => {
    const viewTest1 = sqlGeneration(
      'Views',
      'plsql',
      viewSourceTest1,
      viewTargetTest1
    );
    writeResult('./tests/files/out/view/test_1/result.sql', viewTest1);

    expect(viewTest1).toBe(expectedTest1.result);
  });

  it('the source model has the inventory view, while the target model has the supplier_orders view', () => {
    const viewTest2 = sqlGeneration(
      'Views',
      'plsql',
      viewSourceTest2,
      viewTargetTest2
    );
    writeResult('./tests/files/out/view/test_2/result.sql', viewTest2);

    expect(viewTest2).toBe(expectedTest2.result);
  });

  it(`the source model doesn't have any view, while the target model has`, () => {
    const viewTest3 = sqlGeneration(
      'Views',
      'plsql',
      viewSourceTest3,
      viewTargetTest3
    );
    writeResult('./tests/files/out/view/test_3/result.sql', viewTest3);

    expect(viewTest3).toBe(expectedTest3.result);
  });
});
