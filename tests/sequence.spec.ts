import sqlGeneration from '../src';

import expectedTest1 from './files/in/sequence/test_1/expected.json';
import sequenceSourceTest1 from './files/in/sequence/test_1/source.json';
import sequenceTargetTest1 from './files/in/sequence/test_1/target.json';
import expectedTest2 from './files/in/sequence/test_2/expected.json';
import sequenceSourceTest2 from './files/in/sequence/test_2/source.json';
import sequenceTargetTest2 from './files/in/sequence/test_2/target.json';
import expectedTest3 from './files/in/sequence/test_3/expected.json';
import sequenceSourceTest3 from './files/in/sequence/test_3/source.json';
import sequenceTargetTest3 from './files/in/sequence/test_3/target.json';
import { writeResult } from './utils/writeResult';

describe('Generate sequence synchronization scripts', () => {
  it('the source data model contains sequence while the model to be changed has none', () => {
    const sequenceTest1 = sqlGeneration(
      'Sequences',
      'plsql',
      sequenceSourceTest1,
      sequenceTargetTest1
    );
    writeResult('./tests/files/out/sequence/test_1/result.sql', sequenceTest1);

    expect(sequenceTest1).toBe(expectedTest1.result);
  });

  it(`the source model has the engineer_id_seq sequence,
  while the target model has the id_seq sequence`, () => {
    const sequenceTest2 = sqlGeneration(
      'Sequences',
      'plsql',
      sequenceSourceTest2,
      sequenceTargetTest2
    );
    writeResult('./tests/files/out/sequence/test_2/result.sql', sequenceTest2);

    expect(sequenceTest2).toBe(expectedTest2.result);
  });

  it(`the source model doesn't have any sequence, while the target model has`, () => {
    const sequenceTest3 = sqlGeneration(
      'Sequences',
      'plsql',
      sequenceSourceTest3,
      sequenceTargetTest3
    );
    writeResult('./tests/files/out/sequence/test_3/result.sql', sequenceTest3);

    expect(sequenceTest3).toBe(expectedTest3.result);
  });
});
