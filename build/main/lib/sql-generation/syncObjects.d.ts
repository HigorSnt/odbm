import { Function, Package, Procedure, Sequence, Table, Trigger, View } from './models/index.js';
import { Language } from './sql-generation.js';
export declare const syncFunctions: (sourceFunctions: Function[], targetFunctions: Function[], language: Language) => string;
export declare const syncPackages: (sourcePackages: Package[], targetPackages: Package[], language: Language) => string;
export declare const syncProcedure: (sourceProcedures: Procedure[], targetProcedures: Procedure[], language: Language) => string;
export declare const syncSequence: (sourceSequences: Sequence[], targetSequences: Sequence[], language: Language) => string;
export declare const syncTable: (sourceTables: Table[], targetTables: Table[], language: Language) => string;
export declare const syncTrigger: (sourceTriggers: Trigger[], targetTriggers: Trigger[], language: Language) => string;
export declare const syncView: (sourceViews: View[], targetViews: View[], language: Language) => string;
