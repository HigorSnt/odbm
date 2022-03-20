import sqlGeneration from '../src';

import expectedTest1 from './files/in/trigger/test_1/expected.json';
import triggerSourceTest1 from './files/in/trigger/test_1/source.json';
import triggerTargetTest1 from './files/in/trigger/test_1/target.json';
import expectedTest2 from './files/in/trigger/test_2/expected.json';
import triggerSourceTest2 from './files/in/trigger/test_2/source.json';
import triggerTargetTest2 from './files/in/trigger/test_2/target.json';
import expectedTest3 from './files/in/trigger/test_3/expected.json';
import triggerSourceTest3 from './files/in/trigger/test_3/source.json';
import triggerTargetTest3 from './files/in/trigger/test_3/target.json';
import { writeResult } from './utils/writeResult';

describe('Generate trigger synchronization scripts', () => {
  it('the source data model contains trigger while the model to be changed has none', () => {
    const triggerTest1 = sqlGeneration(
      'Triggers',
      'plsql',
      triggerSourceTest1,
      triggerTargetTest1
    );
    writeResult('./tests/files/out/trigger/test_1/result.sql', triggerTest1);

    expect(triggerTest1).toBe(expectedTest1.result);
  });

  it(`the source model has the check_age trigger,
  while the target model has the user_updated_at_column trigger`, () => {
    const triggerTest2 = sqlGeneration(
      'Triggers',
      'plsql',
      triggerSourceTest2,
      triggerTargetTest2
    );
    writeResult('./tests/files/out/trigger/test_2/result.sql', triggerTest2);

    expect(triggerTest2).toBe(expectedTest2.result);
  });

  it(`the source model doesn't have any trigger, while the target model has`, () => {
    const triggerTest3 = sqlGeneration(
      'Triggers',
      'plsql',
      triggerSourceTest3,
      triggerTargetTest3
    );
    writeResult('./tests/files/out/trigger/test_3/result.sql', triggerTest3);

    expect(triggerTest3).toBe(expectedTest3.result);
  });
});
