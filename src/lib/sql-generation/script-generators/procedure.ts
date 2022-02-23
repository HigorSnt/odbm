import { commands } from '../language/plsql';
import { Procedure } from '../models';

import { revokeScript as revokeGrantScript } from './grant';
import { dropTemplate } from './templates';

export const createScript = (procedureObject: Procedure): string => {
  return procedureObject.script;
};

export const dropScript = (procedureObject: Procedure): string => {
  const { name, owner, grants } = procedureObject;
  const procedureName = owner ? `${owner}.${name}` : name;

  const dropProcedure = dropTemplate
    .replace('<database_object>', commands.procedure)
    .replace('<object_name>', procedureName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropProcedure};\n${revokeGrants.join(';\n')}`;
};
