import * as Diff from 'diff';
import { Grant, Type } from './models';
import { commands } from './language/plsql/index';

/*
Testar:
1 - tem no banco antigo e nao tem no novo
2 - não tem no banco antigo e tem no novo
3 - tem no banco antigo e nao tem no novo (com grants)
4 - não tem no banco antigo e tem no novo (com grants)
5 - testar sem nome de schema
6 - testar diff de grants
 */

interface SanitizedType {
  script: string;
  grants: string[];
}

const sanitizedObjects = (types: Type[]): SanitizedType[] => {
  return types.map(el => <SanitizedType>{
      script: el.script,
      grants: el.grants.map(grant => grant.script),
    },
  );
};

const generateTypeSql = (sourceTypes: Type[], targetTypes: Type[]): string[] => {
  let scripts: string[] = [];
  const diff = Diff.diffJson(sanitizedObjects(sourceTypes), sanitizedObjects(targetTypes));
  const diffs = diff.filter(d => d.added || d.removed);

  diffs.forEach(diff => {
    const values = diff.value.split(',').map(s => s.replace(/[{}]/g, '').trim());

    if (diff.added) {
      /**
       * The old database doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the type must be removed and grants revoked.
       *
       */
      values.forEach(value => {
        if (value.includes('script')) {
          const splittedValue = value.split(' ');
          const typeTermIndex: number = splittedValue.indexOf(commands.type);
          const schemaAndTypeName: string = splittedValue[typeTermIndex + 1];

          const dropScript = `${commands.drop} ${commands.type} ${schemaAndTypeName};`;
          scripts.push(dropScript);
        } else if (value.includes('grants')) {
          const [_, grantScript] = value.split(':');
          const grantScripts: string[] = JSON.parse(grantScript);
          const grants: Grant[] = targetTypes
            .map(type => type.grants.filter(grant => grantScripts.includes(grant.script)))
            .reduce((previous, current) => previous.concat(current));

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
        if (value.includes('script')) {
          const [_, script] = value.split(':');
          scripts.push(script.trim());
        } else if (value.includes('grants')) {
          const [_, grantScript] = value.split(':');
          const grantScripts: string[] = JSON.parse(grantScript);
          scripts.concat(grantScripts);
        }
      });
    }
  });

  return scripts;
};

export default generateTypeSql;
