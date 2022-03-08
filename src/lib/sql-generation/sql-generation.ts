import {
  syncFunctions,
  syncPackages,
  syncProcedure,
  syncSequence,
  syncTable,
  syncTrigger,
  syncTypes,
  syncView,
} from './syncObjects';

export type Definition =
  | 'Types'
  | 'Functions'
  | 'Packages'
  | 'Views'
  | 'Triggers'
  | 'Procedures'
  | 'Sequences'
  | 'Tables';

export type Language = 'plsql';

export const sqlGeneration = (
  type: Definition,
  language: Language,
  sourceObject: any,
  targetObject: any
): string => {
  switch (type) {
    case 'Types':
      return syncTypes(sourceObject, targetObject, language);
    case 'Functions':
      return syncFunctions(sourceObject, targetObject, language);
    case 'Packages':
      return syncPackages(sourceObject, targetObject, language);
    case 'Views':
      return syncView(sourceObject, targetObject, language);
    case 'Triggers':
      return syncTrigger(sourceObject, targetObject, language);
    case 'Procedures':
      return syncProcedure(sourceObject, targetObject, language);
    case 'Sequences':
      return syncSequence(sourceObject, targetObject, language);
    case 'Tables':
      return syncTable(sourceObject, targetObject, language);
    default:
      throw Error('Invalid Type');
  }
};
