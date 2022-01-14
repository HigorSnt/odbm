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
  switch (type) {
    case 'Types':
      console.log('executando types');
      return generateWithGrants(sourceTypes, targetTypes, commands.type);
      break;
    case 'Functions':
      console.log('executando functions');
      return generateWithGrants(sourceFunctions, targetFunctions, commands.function);
      break;
    case 'Packages':
      return generateWithGrants(sourcePackages, targetPackages, commands.package);
      break;
    case 'Views':
      return generateWithGrants(sourceViews, targetViews, commands.view);
      break;
    case 'Triggers':
      return generate(sourceTrigger, targetTrigger, commands.trigger);
      break;
    case 'Procedures':
      return generateWithGrants(sourceProcedures, targetProcedures, commands.procedure);
      break;
    case 'Sequences':
      return generateWithGrants(sourceSequence, targetSequence, commands.sequence);
      break;
    case 'Tables':
      return generateWithGrants(sourceTables, targetTables, commands.table);
      break;
    default:
      throw Error('Invalid Type');
  }
};

workerpool.worker({ executeGeneration });
