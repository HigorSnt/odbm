import * as Diff from 'diff';
import { targetTypes } from './mock/types/target';
import { sourceTypes } from './mock/types/source';
import generateTypeSql from './typeGeneration';

export type Definitions = 'Types'
  | 'Functions'
  | 'Packages'
  | 'Views'
  | 'Triggers'
  | 'Procedures'
  | 'Sequences'
  | 'Tables';

export const sqlGeneration = (type: Definitions) => {
  let commands: string[] = [];
  const diff = Diff.diffJson(sourceTypes, targetTypes);

  switch (type) {
    case 'Types':
      const filteredDiffs = diff.filter(d => d.added || d.removed);
      commands = [...commands, ...generateTypeSql(filteredDiffs, sourceTypes, targetTypes)];
      console.log(commands);
      break;
    default:
      throw Error('');
  }
};
