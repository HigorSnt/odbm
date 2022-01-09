import * as Diff from 'diff';
import {
  Function,
  Package,
  Procedure,
  Sequence,
  Table,
  Trigger,
  Type,
  View
} from './models';
import { commands } from './language/plsql/index';
import { sanitizedObjects } from './utils/sanitizeObjects';
import { createGrant, revokeGrant } from './grantGeneration';

export const generateWithGrants = (
  sourceElements: (Function | Package | Procedure | Sequence | Table | Type | View)[],
  targetElements: (Function | Package | Procedure | Sequence | Table | Type | View)[],
  command: string,
) => {
  let scripts: string[] = [];
  const diff = Diff.diffJson(
    sanitizedObjects(sourceElements),
    sanitizedObjects(targetElements),
  );
  const diffs = diff.filter(d => d.added || d.removed);

  diffs.forEach(diff => {
    const values = diff.value.split(',').map(s => s.replace(/[{}]/g, '').trim());

    if (diff.added) {
      /**
       * The old database doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the element must be removed and grants revoked.
       *
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const dropScript = getDropScript(value, command);
          scripts.push(dropScript);
        } else if (value.includes(commands.grant)) {
          const arr = revokeGrant(value, targetElements);
          scripts.push(...arr);
        }
      });

    } else {
      /**
       * The old db has it and the new one doesn't. So we must create in the new.
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const elemObj = getCreateScript(value, command, sourceElements);
          scripts.push(elemObj);
        } else if (value.includes(commands.grant)) {
          const grantScripts: string[] = createGrant(value);
          scripts.push(...grantScripts);
        }
      });
    }
  });

  return scripts;
};

export const generate = (
  sourceElements: Trigger[],
  targetElements: Trigger[],
  command: string,
) => {
  let scripts: string[] = [];
  const diff = Diff.diffJson(
    sanitizedObjects(sourceElements),
    sanitizedObjects(targetElements),
  );
  const diffs = diff.filter(d => d.added || d.removed);

  diffs.forEach(diff => {
    const values = diff.value.split(',').map(s => s.replace(/[{}]/g, '').trim());

    if (diff.added) {
      /**
       * The old database doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the element must be removed and grants revoked.
       *
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const dropScript = getDropScript(value, command);
          scripts.push(dropScript);
        }
      });

    } else {
      /**
       * The old db has it and the new one doesn't. So we must create in the new.
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const elemObj = getCreateScript(value, command, sourceElements);
          scripts.push(elemObj);
        }
      });
    }
  });

  return scripts;
};

const getDropScript = (value: string, command: string): string => {
  const splittedValue = value.split(' ');
  const elementTermIndex: number = splittedValue.indexOf(command);
  const schemaAndElementName: string = splittedValue[elementTermIndex + 1];

  return `${commands.drop} ${command} ${schemaAndElementName};`;
}

const getCreateScript = (value: string, command: string, elements: any[]) => {
  const [, script] = value.split(':');
  const splittedScript = script.split(' ');
  const funtionCommandIndex = splittedScript.indexOf(command);
  const [, elemName] = splittedScript[funtionCommandIndex + 1].split('.');

  const elemObj = elements.filter(el => elemName.includes(el.name))[0];
  return elemObj.script;
};
