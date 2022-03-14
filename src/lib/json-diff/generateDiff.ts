import { Diff } from './models/index.js';

export const generateDiff = (oldObj: any[], newObj: any[]): Diff[] => {
  const diffs: Diff[] = [];
  const oldObjMappedByName: Map<string, any> = new Map(
    oldObj.map(obj => [obj.name, JSON.stringify(obj)])
  );

  const newObjMappedByName: Map<string, any> = new Map(
    newObj.map(obj => [obj.name, JSON.stringify(obj)])
  );

  for (const [key, value] of oldObjMappedByName.entries()) {
    if (newObjMappedByName.has(key)) {
      const newValue = newObjMappedByName.get(key);
      if (newValue !== value) {
        diffs.push({ value: newValue, changed: true });
      }
    } else {
      diffs.push({ value, added: true });
    }
  }

  for (const [key, value] of newObjMappedByName.entries()) {
    if (!oldObjMappedByName.has(key)) {
      diffs.push({ value, removed: true });
    }
  }

  return diffs;
};
