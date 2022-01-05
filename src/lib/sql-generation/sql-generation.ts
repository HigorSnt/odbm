import * as Diff from 'diff';
import { targetTypes } from './mock/types/target';
import { sourceTypes } from './mock/types/source';
import { sourceFunctions } from './mock/functions/source';
import { targetFunctions } from './mock/functions/target';
import generateTypeSql from './typeGeneration';
import generateFunctionSql from './functionGeneration';

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
  let diff: Diff.Change[];
  let filteredDiffs: Diff.Change[];

  switch (type) {
    case 'Types':
      const scripts: string[] = generateTypeSql(sourceTypes, targetTypes);
      commands = commands.concat(scripts);
      console.log(commands);
      break;
    case 'Functions':
      diff = Diff.diffJson(sourceFunctions, targetFunctions);
      filteredDiffs = diff.filter(d => d.added || d.removed);
      commands = commands.concat(generateFunctionSql(filteredDiffs, sourceFunctions, targetFunctions));
      break;
    default:
      throw Error('');
  }
};
