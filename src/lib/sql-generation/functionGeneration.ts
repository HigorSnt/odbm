import { Function } from './models';
// import { commands } from './language/plsql/index';

// @ts-ignore
const generateFunctionSql = (diffs: Diff.Change[], sourceTypes: Function[], targetTypes: Function[]): string[] => {
  // let scripts: string[] = [];

  diffs.forEach(diff => {
    console.log(diff);
    // const functionsNames: string[] = [];
    // const values = diff.value.split(/[:,]+/);
    //
    // values.forEach((element, index) =>
    //   element.includes('name') ?
    //     functionsNames.push(values[index + 1].trim().replace(new RegExp('"', 'g'), ''))
    //     : null);
    // console.log(functionsNames);
  });
  // console.log(diffs);
}

export default generateFunctionSql;

