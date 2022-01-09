import { Grant } from './models';
import { commands } from './language/plsql/index';

export const revokeGrant = (value: string, databaseElement: any[]): string[] => {
  const grants: Grant[] = [];

  if (value.includes('grants')) {
    const [_, grantScript] = value.split(':');
    const grantScripts: string[] = JSON.parse(grantScript);
    grants.push(...(databaseElement
      .map(procedure => procedure.grants.filter((grant: any) => grantScripts.includes(grant.script)))
      .reduce((previous, current) => [...previous, ...current])));
  } else {
    grants.push(...(databaseElement
      .map(procedure => procedure.grants.filter((grant: any) => value.includes(grant.script)))
      .reduce((previous, current) => [...previous, ...current])));
  }

  const scripts: string[] = [];
  grants.forEach(grant => {
    const revokeGrant = `${commands.revoke} ${grant.privilege} ${commands.on} ` +
      `${grant.owner ? grant.owner + '.' : ''}${grant.objectName} ` +
      `${commands.from} ${grant.grantee}`;
    scripts.push(revokeGrant);
  });

  return scripts;
};

export const createGrant = (value: string): string[] => {
  const grantScripts: string[] = [];

  if (value.includes('grants')) {
    const [_, grantScript] = value.split(':');
    grantScripts.push(...JSON.parse(grantScript));
  } else {
    grantScripts.push(value.trim());
  }

  return grantScripts;
};
