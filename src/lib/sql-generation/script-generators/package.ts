import { commands } from '../language/plsql';
import { Package } from '../models';

import { revokeScript as revokeGrantScript } from './grant';
import { dropTemplate } from './templates';

export const createScript = (packageObject: Package): string => {
  return packageObject.script;
};

export const dropScript = (packageObject: Package): string => {
  const { name, owner, grants } = packageObject;
  const packageName = owner ? `${owner}.${name}` : name;

  const dropPackage = dropTemplate
    .replace('<database_object>', commands.package)
    .replace('<object_name>', packageName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropPackage};\n${revokeGrants.join(';\n')}`;
};
