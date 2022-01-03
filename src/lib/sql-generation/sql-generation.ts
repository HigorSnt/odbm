import * as Diff from 'diff';
import { targetTypes } from './mock/types/target';
import { sourceTypes } from './mock/types/source';

export type Definitions = 'Types'
  | 'Functions'
  | 'Packages'
  | 'Views'
  | 'Triggers'
  | 'Procedures'
  | 'Sequences'
  | 'Tables';

let scripts: string[] = [];

export const sqlGeneration = (type: Definitions) => {
  const diff = Diff.diffJson(sourceTypes, targetTypes);

  switch (type) {
    case 'Types':
      generateTypeSql(diff.filter(d => d.added || d.removed), sourceTypes, targetTypes);
      break;
    default:
      throw Error('');
  }
};

// @ts-ignore
const generateTypeSql = (diff: Diff.Change[], sourceTypes: any, targetTypes: any) => {
  diff.forEach(d => {
    const names: string[] = [];
    const values = d.value.split(/[:,]+/);
    values.forEach((element, i) => element.includes('name') ? names.push(values[i + 1].trim().replace(new RegExp('"', 'g'), '')) : null);
    if (d.added) {
    } else {
      console.log(names);
      const a = sourceTypes.filter((el: any) => names.includes(el.name.trim()));
      scripts.push(a.forEach((el: any) => {
        scripts.push(el.script.trim()); }));
    }
  });
  console.log(scripts);

};
