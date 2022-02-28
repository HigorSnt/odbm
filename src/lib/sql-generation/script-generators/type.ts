import { commands } from '../language/plsql';
import { DROP_TEMPLATE } from '../language/plsql/template';
import { Type } from '../models';

import { revokeScript as revokeGrantScript } from './grant';

export const createScript = (typeObject: Type): string => {
  return typeObject.script;
};

export const dropScript = (typeObject: Type): string => {
  const { name, schemaName, grants } = typeObject;
  const typeName = schemaName ? `${schemaName}.${name}` : name;

  const dropType = DROP_TEMPLATE
    .replace('<database_object>', commands.type)
    .replace('<object_name>', typeName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropType}\n${revokeGrants.join('\n')}`;
};
