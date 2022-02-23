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

export const sqlGeneration = (
  type: Definition,
  sourceObject: any,
  targetObject: any
) => {
  switch (type) {
    case 'Types':
      return syncTypes(sourceObject, targetObject);
    case 'Functions':
      return syncFunctions(sourceObject, targetObject);
    case 'Packages':
      return syncPackages(sourceObject, targetObject);
    case 'Views':
      return syncView(sourceObject, targetObject);
    case 'Triggers':
      return syncTrigger(sourceObject, targetObject);
    case 'Procedures':
      return syncProcedure(sourceObject, targetObject)
    case 'Sequences':
      return syncSequence(sourceObject, targetObject)
    case 'Tables':
      return syncTable(sourceObject, targetObject);
    default:
      throw Error('Invalid Type');
  }
};
