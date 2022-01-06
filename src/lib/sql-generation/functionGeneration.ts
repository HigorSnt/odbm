import * as Diff from 'diff';
import { Function, Grant } from './models';
import { commands } from './language/plsql/index';

interface SanitizedFunction {
  name: string;
  script: string;
  grants: string[];
}

const sanitizedObjects = (functions: Function[]): SanitizedFunction[] => {
  return functions.map(el => <SanitizedFunction>{
      name: el.name,
      script: el.script,
      grants: el.grants.map(grant => grant.script),
    },
  );
};

const generateFunctionSql = (sourceFunctions: Function[], targetFunctions: Function[]): string[] => {
  let scripts: string[] = [];
  const diff = Diff.diffJson(sanitizedObjects(sourceFunctions), sanitizedObjects(targetFunctions));
  const diffs = diff.filter(d => d.added || d.removed);

  diffs.forEach(diff => {
    const values = diff.value.split(',').map(s => s.replace(/[{}]/g, '').trim());

    if (diff.added) {
      /**
       * The old database doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the function must be removed and grants revoked.
       *
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const splittedValue = value.split(' ');
          const typeTermIndex: number = splittedValue.indexOf(commands.function);
          const schemaAndFunctionName: string = splittedValue[typeTermIndex + 1];

          const dropScript = `${commands.drop} ${commands.type} ${schemaAndFunctionName};`;
          scripts.push(dropScript);
        } else if (value.includes(commands.grant)) {
          const grants: Grant[] = [];

          if (value.includes('grants')) {
            const [_, grantScript] = value.split(':');
            const grantScripts: string[] = JSON.parse(grantScript);
            grants.concat(targetFunctions
              .map(type => type.grants.filter(grant => grantScripts.includes(grant.script)))
              .reduce((previous, current) => previous.concat(current)));
          } else {
            grants.concat(targetFunctions
              .map(type => type.grants.filter(grant => value.includes(grant.script)))
              .reduce((previous, current) => previous.concat(current)));
          }

          grants.forEach(grant => {
            const revokeGrant = `${commands.revoke} ${grant.privilege} ${commands.on} ` +
              `${grant.owner ? grant.owner + '.' : ''}${grant.objectName} ` +
              `${commands.from} ${grant.grantee}`;
            scripts.push(revokeGrant);
          });
        }
      });

    } else {
      /**
       * The old db has it and the new one doesn't. So we must create in the new.
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const [, script] = value.split(':');
          const splittedScript = script.split(" ");
          const funtionCommandIndex = splittedScript.indexOf(commands.function);
          const [, funcName] = splittedScript[funtionCommandIndex + 1].split(".");

          const funcObj = sourceFunctions.filter(func => funcName.includes(func.name))[0];

          scripts.push(funcObj.script);
        } else if (value.includes(commands.grant)) {
          const grantScripts: string[] = [];

          if (value.includes('grants')) {
            const [_, grantScript] = value.split(':');
            grantScripts.concat(JSON.parse(grantScript));
          } else {
            grantScripts.push(value.trim());
          }

          scripts.concat(grantScripts);
        }
      });
    }
  });

  return scripts;
};

export default generateFunctionSql;

