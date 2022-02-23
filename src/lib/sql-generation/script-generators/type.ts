import { commands } from '../language/plsql';
import { Type } from '../models';

import { revokeScript as revokeGrantScript } from './grant';
import { dropTemplate } from './templates';

export const createScript = (typeObject: Type): string => {
  return typeObject.script;
};

export const dropScript = (typeObject: Type): string => {
  const { name, owner, grants } = typeObject;
  const typeName = owner ? `${owner}.${name}` : name;

  const dropType = dropTemplate
    .replace('<database_object>', commands.type)
    .replace('<object_name>', typeName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropType};\n${revokeGrants.join(';\n')}`;
};
