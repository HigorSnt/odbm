import { Function, Package, Procedure, Sequence, Table, Trigger, Type, View } from './models';
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
import { generateWithGrants, generate } from './generation';
import { commands } from './language/plsql/index';

export type Definitions = 'Types'
  | 'Functions'
  | 'Packages'
  | 'Views'
  | 'Triggers'
  | 'Procedures'
  | 'Sequences'
  | 'Tables';

export const sqlGeneration = (type: Definitions) => {
  // let commands: string[] = [];
  let scripts: string[];

  switch (type) {
    case 'Types':
      scripts = generateTypeSql(sourceTypes, targetTypes);
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
    case 'Procedures':
      scripts = generateProcedureSql(sourceProcedures, targetProcedures);
      console.log(scripts);
      break;
    case 'Sequences':
      scripts = generateSequenceSql(sourceSequence, targetSequence);
      console.log(scripts);
      break;
    case 'Tables':
      scripts = generateTableSql(sourceTables, targetTables);
      console.log(scripts);
      break;
    default:
      throw Error('');
  }
};

const generateFunctionSql = (source: Function[], target: Function[]) => {
  return generateWithGrants(source, target, commands.function);
}

const generatePackageSql = (source: Package[], target: Package[]) => {
  return generateWithGrants(source, target, commands.package);
}

const generateProcedureSql = (source: Procedure[], target: Procedure[]) => {
  return generateWithGrants(source, target, commands.procedure);
}

const generateSequenceSql = (source: Sequence[], target: Sequence[]) => {
  return generateWithGrants(source, target, commands.sequence);
}

const generateTableSql = (source: Table[], target: Table[]) => {
  return generateWithGrants(source, target, commands.table);
}

const generateTriggerSql = (source: Trigger[], target: Trigger[]) => {
  return generate(source, target, commands.trigger);
}

const generateTypeSql = (source: Type[], target: Type[]) => {
  return generateWithGrants(source, target, commands.type);
}

const generateViewSql = (source: View[], target: View[]) => {
  return generateWithGrants(source, target, commands.view);
}
