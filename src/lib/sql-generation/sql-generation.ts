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
  let scripts: string[];

  switch (type) {
    case 'Types':
      scripts = generateTypeSql(sourceTypes, targetTypes);
      commands = commands.concat(scripts);
      console.log(commands);
      break;
    case 'Functions':
      scripts = generateFunctionSql(sourceFunctions, targetFunctions);
      console.log(scripts);
      break;
    default:
      throw Error('');
  }
};
