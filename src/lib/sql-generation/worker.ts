import * as workerpool from 'workerpool';
import { Definition } from './sql-generation';
import { generate, generateWithGrants } from './generation';
import { commands } from './language/plsql/index';

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
import { sourceProcedures } from './mock/procedures/source';
import { targetProcedures } from './mock/procedures/target';
import { sourceSequence } from './mock/sequences/source';
import { targetSequence } from './mock/sequences/target';
import { sourceTables } from './mock/tables/source';
import { targetTables } from './mock/tables/target';

const executeGeneration = (type: Definition) => {
  let scripts = [];
  switch (type) {
    case 'Types':
      scripts = generateWithGrants(sourceTypes, targetTypes, commands.type);
      break;
    case 'Functions':
      scripts = generateWithGrants(sourceFunctions, targetFunctions, commands.function);
      break;
    case 'Packages':
      scripts = generateWithGrants(sourcePackages, targetPackages, commands.package);
      break;
    case 'Views':
      scripts = generateWithGrants(sourceViews, targetViews, commands.view);
      break;
    case 'Triggers':
      scripts = generate(sourceTrigger, targetTrigger, commands.trigger);
      break;
    case 'Procedures':
      scripts = generateWithGrants(sourceProcedures, targetProcedures, commands.procedure);
      break;
    case 'Sequences':
      scripts = generateWithGrants(sourceSequence, targetSequence, commands.sequence);
      break;
    case 'Tables':
      scripts = generateWithGrants(sourceTables, targetTables, commands.table);
      break;
    default:
      throw Error('Invalid Type');
  }

  return scripts
    .map(s => s.replace(/(^"|\r\n|\n|\r|"$)/gm, '').trim())
    .join('\n');
};

workerpool.worker({ executeGeneration });
