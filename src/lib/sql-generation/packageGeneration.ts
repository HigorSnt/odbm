import * as Diff from 'diff';
import { Package, Grant } from './models';
import { commands } from './language/plsql/index';

interface SanitizedPackage {
  name: string;
  script: string;
  grants: string[];
}

const sanitizedObjects = (packages: Package[]): SanitizedPackage[] => {
  return packages.map(el => <SanitizedPackage>{
      name: el.name,
      script: el.script,
      grants: el.grants.map(grant => grant.script),
    },
  );
};

const generatePackageSql = (sourcePackage: Package[], targetPackage: Package[]): string[] => {
  let scripts: string[] = [];
  const diff = Diff.diffJson(sanitizedObjects(sourcePackage), sanitizedObjects(targetPackage));
  const diffs = diff.filter(d => d.added || d.removed);

  diffs.forEach(diff => {
    const values = diff.value
      .split(',')
      .map(s => s.replace(/[{}]/g, '').trim());

    if (diff.added) {
      /**
       * The old database doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the package must be removed and grants revoked.
       *
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const splittedValue = value.split(' ');
          const packageTermIndex: number = splittedValue.indexOf(commands.package);
          const schemaAndPackageName: string = splittedValue[packageTermIndex + 1];

          const dropScript = `${commands.drop} ${commands.package} ${schemaAndPackageName};`;
          scripts.push(dropScript);
        } else if (value.includes(commands.grant)) {
          const grants: Grant[] = [];

          if (value.includes('grants')) {
            const [_, grantScript] = value.split(':');
            const grantScripts: string[] = JSON.parse(grantScript);
            grants.concat(targetPackage
              .map(pack => pack.grants.filter(grant => grantScripts.includes(grant.script)))
              .reduce((previous, current) => previous.concat(current)));
          } else {
            grants.concat(targetPackage
              .map(pack => pack.grants.filter(grant => value.includes(grant.script)))
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
          const packageCommandIndex = splittedScript.indexOf(commands.package);
          const [, packageName] = splittedScript[packageCommandIndex + 1].split(".");

          const packObj = sourcePackage.filter(pack => packageName.includes(pack.name))[0];

          scripts.push(packObj.script);
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
}

export default generatePackageSql;
