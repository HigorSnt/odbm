import * as Diff from 'diff';
import { View, Grant } from './models';
import { commands } from './language/plsql/index';

interface SanitizedView {
  name: string;
  script: string;
  grants: string[];
}

const sanitizedObjects = (views: View[]): SanitizedView[] => {
  return views.map(el => <SanitizedView>{
      name: el.name,
      script: el.script,
      grants: el.grants.map(grant => grant.script),
    },
  );
};

const generateViewSql = (sourceView: View[], targetView: View[]): string[] => {
  let scripts: string[] = [];
  const diff = Diff.diffJson(sanitizedObjects(sourceView), sanitizedObjects(targetView));
  const diffs = diff.filter(d => d.added || d.removed);

  diffs.forEach(diff => {
    const values = diff.value
      .split(',')
      .map(s => s.replace(/[{}]/g, '').trim());

    if (diff.added) {
      /**
       * The old database doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the view must be removed and grants revoked.
       *
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const splittedValue = value.split(' ');
          const viewTermIndex: number = splittedValue.indexOf(commands.view);
          const schemaAndViewName: string = splittedValue[viewTermIndex + 1];

          const dropScript = `${commands.drop} ${commands.view} ${schemaAndViewName};`;
          scripts.push(dropScript);
        } else if (value.includes(commands.grant)) {
          const grants: Grant[] = [];

          if (value.includes('grants')) {
            const [_, grantScript] = value.split(':');
            const grantScripts: string[] = JSON.parse(grantScript);
            grants.concat(targetView
              .map(view => view.grants.filter(grant => grantScripts.includes(grant.script)))
              .reduce((previous, current) => previous.concat(current)));
          } else {
            grants.concat(targetView
              .map(view => view.grants.filter(grant => value.includes(grant.script)))
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
          const viewCommandIndex = splittedScript.indexOf(commands.view);
          const [, viewName] = splittedScript[viewCommandIndex + 1].split('.');

          const viewObj = sourceView.filter(view => viewName.includes(view.name))[0];

          scripts.push(viewObj.script);
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

export default generateViewSql;
