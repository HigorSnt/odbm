import { Diff, generateDiff } from '../json-diff';

import {
  Function,
  Package,
  Procedure,
  Sequence,
  Table,
  Trigger,
  Type,
  View,
} from './models';
import {
  functionGeneration,
  packageGeneration,
  procedureGeneration,
  sequenceGeneration,
  tableGeneration,
  triggerGeneration,
  typeGeneration,
  viewGeneration,
} from './script-generators';

export const syncTypes = (sourceTypes: Type[], targetTypes: Type[]): string[] => {
  const diffs: Diff[] = generateDiff(sourceTypes, targetTypes);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = typeGeneration.createScript(objDiff.value);
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = typeGeneration.dropScript(objDiff.value);
      scripts.push(script);
    }
  }

  return scripts;
};

export const syncFunctions = (sourceFunctions: Function[], targetFunctions: Function[]): string[] => {
  const diffs: Diff[] = generateDiff(sourceFunctions, targetFunctions);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = functionGeneration.createScript(objDiff.value);
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = functionGeneration.dropScript(objDiff.value);
      scripts.push(script);
    }
  }

  return scripts;
};

export const syncPackages = (sourcePackages: Package[], targetPackages: Package[]): string[] => {
  const diffs: Diff[] = generateDiff(sourcePackages, targetPackages);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = packageGeneration.createScript(objDiff.value);
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = packageGeneration.dropScript(objDiff.value);
      scripts.push(script);
    }
  }

  return scripts;
};

export const syncProcedure = (sourceProcedures: Procedure[], targetProcedures: Procedure[]): string[] => {
  const diffs: Diff[] = generateDiff(sourceProcedures, targetProcedures);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = procedureGeneration.createScript(objDiff.value);
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = procedureGeneration.dropScript(objDiff.value);
      scripts.push(script);
    }
  }

  return scripts;
};

export const syncSequence = (sourceSequences: Sequence[], targetSequences: Sequence[]): string[] => {
  const diffs: Diff[] = generateDiff(sourceSequences, targetSequences);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = sequenceGeneration.createScript(objDiff.value);
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = sequenceGeneration.dropScript(objDiff.value);
      scripts.push(script);
    }
  }

  return scripts;
};

export const syncTable = (sourceTables: Table[], targetTables: Table[]): string[] => {
  const diffs: Diff[] = generateDiff(sourceTables, targetTables);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = tableGeneration.createScript(objDiff.value);
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = tableGeneration.dropScript(objDiff.value);
      scripts.push(script);
    }
  }

  return scripts;
};

export const syncTrigger = (sourceTriggers: Trigger[], targetTriggers: Trigger[]): string[] => {
  const diffs: Diff[] = generateDiff(sourceTriggers, targetTriggers);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = triggerGeneration.createScript(objDiff.value);
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = triggerGeneration.dropScript(objDiff.value);
      scripts.push(script);
    }
  }

  return scripts;
};

export const syncView = (sourceViews: View[], targetViews: View[]): string[] => {
  const diffs: Diff[] = generateDiff(sourceViews, targetViews);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = viewGeneration.createScript(objDiff.value);
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = viewGeneration.dropScript(objDiff.value);
      scripts.push(script);
    }
  }

  return scripts;
};
