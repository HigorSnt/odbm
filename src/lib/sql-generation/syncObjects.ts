import { format, FormatOptions } from 'sql-formatter';

import { Diff, generateDiff } from '../json-diff';

import {
  functionGeneration,
  packageGeneration,
  procedureGeneration,
  sequenceGeneration,
  tableGeneration,
  triggerGeneration,
  viewGeneration,
} from './generators';
import {
  Function,
  Package,
  Procedure,
  Sequence,
  Table,
  Trigger,
  View,
} from './models';
import { Language } from './sql-generation';

const formatOptions = (language: Language): FormatOptions => ({
  language,
  uppercase: true,
  linesBetweenQueries: 2,
});

export const syncFunctions = (
  sourceFunctions: Function[],
  targetFunctions: Function[],
  language: Language
): string => {
  const diffs: Diff[] = generateDiff(sourceFunctions, targetFunctions);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = functionGeneration.createScript(JSON.parse(objDiff.value));
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = functionGeneration.dropScript(JSON.parse(objDiff.value));
      scripts.push(script);
    }
  }

  return format(scripts.join('\n\n'), formatOptions(language));
};

export const syncPackages = (
  sourcePackages: Package[],
  targetPackages: Package[],
  language: Language
): string => {
  const diffs: Diff[] = generateDiff(sourcePackages, targetPackages);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = packageGeneration.createScript(JSON.parse(objDiff.value));
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = packageGeneration.dropScript(JSON.parse(objDiff.value));
      scripts.push(script);
    }
  }

  return format(scripts.join('\n\n'), formatOptions(language));
};

export const syncProcedure = (
  sourceProcedures: Procedure[],
  targetProcedures: Procedure[],
  language: Language
): string => {
  const diffs: Diff[] = generateDiff(sourceProcedures, targetProcedures);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = procedureGeneration.createScript(
        JSON.parse(objDiff.value)
      );
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = procedureGeneration.dropScript(JSON.parse(objDiff.value));
      scripts.push(script);
    }
  }

  return format(scripts.join('\n\n'), formatOptions(language));
};

export const syncSequence = (
  sourceSequences: Sequence[],
  targetSequences: Sequence[],
  language: Language
): string => {
  const diffs: Diff[] = generateDiff(sourceSequences, targetSequences);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = sequenceGeneration.createScript(JSON.parse(objDiff.value));
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = sequenceGeneration.dropScript(JSON.parse(objDiff.value));
      scripts.push(script);
    }
  }

  return format(scripts.join('\n\n'), formatOptions(language));
};

export const syncTable = (
  sourceTables: Table[],
  targetTables: Table[],
  language: Language
): string => {
  const diffs: Diff[] = generateDiff(sourceTables, targetTables);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = tableGeneration.createScript(JSON.parse(objDiff.value));
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = tableGeneration.dropScript(JSON.parse(objDiff.value));
      scripts.push(script);
    }
  }

  return format(scripts.join('\n\n'), formatOptions(language));
};

export const syncTrigger = (
  sourceTriggers: Trigger[],
  targetTriggers: Trigger[],
  language: Language
): string => {
  const diffs: Diff[] = generateDiff(sourceTriggers, targetTriggers);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = triggerGeneration.createScript(JSON.parse(objDiff.value));
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = triggerGeneration.dropScript(JSON.parse(objDiff.value));
      scripts.push(script);
    }
  }

  return format(scripts.join('\n\n'), formatOptions(language));
};

export const syncView = (
  sourceViews: View[],
  targetViews: View[],
  language: Language
): string => {
  const diffs: Diff[] = generateDiff(sourceViews, targetViews);
  const scripts: string[] = [];

  for (const objDiff of diffs) {
    if (objDiff.added) {
      const script = viewGeneration.createScript(JSON.parse(objDiff.value));
      scripts.push(script);
    } else if (objDiff.removed) {
      const script = viewGeneration.dropScript(JSON.parse(objDiff.value));
      scripts.push(script);
    }
  }

  return format(scripts.join('\n\n'), formatOptions(language));
};
