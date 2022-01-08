import * as Diff from 'diff';
import { Procedure, Grant } from './models';
import { commands } from './language/plsql/index';

interface SanitizedProcedure {
  name: string;
  script: string;
  grants: string[];
}

const sanitizedObjects = (procedure: Procedure[]): SanitizedProcedure[] => {
  return procedure.map(el => <SanitizedProcedure>{
      name: el.name,
      script: el.script,
      grants: el.grants.map(grant => grant.script),
    },
  );
};

const generateProcedureSql = (sourceProcedure: Procedure[], targetProcedure: Procedure[]): string[] => {
  let scripts: string[] = [];
  const diff = Diff.diffJson(sanitizedObjects(sourceProcedure), sanitizedObjects(targetProcedure));
  const diffs = diff.filter(d => d.added || d.removed);

  diffs.forEach(diff => {
    const values = diff.value
      .split(',')
      .map(s => s.replace(/[{}]/g, '').trim());

    if (diff.added) {
      /**
       * The old database doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the procedure must be removed and grants revoked.
       *
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const splittedValue = value.split(' ');
          const procedureTermIndex: number = splittedValue.indexOf(commands.procedure);
          const schemaAndProcedureName: string = splittedValue[procedureTermIndex + 1];

          const dropScript = `${commands.drop} ${commands.procedure} ${schemaAndProcedureName};`;
          scripts.push(dropScript);
        } else if (value.includes(commands.grant)) {
          const grants: Grant[] = [];

          if (value.includes('grants')) {
            const [_, grantScript] = value.split(':');
            const grantScripts: string[] = JSON.parse(grantScript);
            grants.concat(targetProcedure
              .map(procedure => procedure.grants.filter(grant => grantScripts.includes(grant.script)))
              .reduce((previous, current) => previous.concat(current)));
          } else {
            grants.concat(targetProcedure
              .map(procedure => procedure.grants.filter(grant => value.includes(grant.script)))
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
          const splittedScript = script.split(' ');
          const procedureCommandIndex = splittedScript.indexOf(commands.procedure);
          const [, procedureName] = splittedScript[procedureCommandIndex + 1].split('.');

          const procedureObj = sourceProcedure.filter(procedure => procedureName.includes(procedure.name))[0];

          scripts.push(procedureObj.script);
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

export default generateProcedureSql;
