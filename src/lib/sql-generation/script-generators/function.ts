import { commands } from '../language/plsql';
import { Function } from '../models';

import { revokeScript as revokeGrantScript } from './grant';
import { dropTemplate } from './templates';

export const createScript = (functionObject: Function): string => {
  return functionObject.script;
};

export const dropScript = (functionObject: Function): string => {
  const { name, owner, grants } = functionObject;
  const viewName = owner ? `${owner}.${name}` : name;

  const dropView = dropTemplate
    .replace('<database_object>', commands.function)
    .replace('<object_name>', viewName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropView};\n${revokeGrants.join(';\n')}`;
};
