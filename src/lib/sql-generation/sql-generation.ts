import { targetTypes } from './mock/types/target';
import { sourceTypes } from './mock/types/source';
import { sourceFunctions } from './mock/functions/source';
import { targetFunctions } from './mock/functions/target';
import { sourcePackages } from './mock/packages/source';
import { targetPackages } from './mock/packages/target';
import { sourceViews } from './mock/views/source';
import { targetViews } from './mock/views/target';
import { sourceTrigger } from './mock/triggers/source';
import { targetTrigger } from './mock/triggers/target';
import generateTypeSql from './typeGeneration';
import generateFunctionSql from './functionGeneration';
import generatePackageSql from './packageGeneration';
import generateViewSql from './viewGeneration';
import generateTriggerSql from './triggerGeneration';

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
    case 'Packages':
      scripts = generatePackageSql(sourcePackages, targetPackages);
      console.log(scripts);
      break;
    case 'Views':
      scripts = generateViewSql(sourceViews, targetViews);
      console.log(scripts);
      break;
    case 'Triggers':
      scripts = generateTriggerSql(sourceTrigger, targetTrigger);
      console.log(scripts);
      break;
    default:
      throw Error('');
  }
};
