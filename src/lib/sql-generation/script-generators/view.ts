import { commands } from '../language/plsql';
import { View } from '../models';

import { revokeScript as revokeGrantScript } from './grant';
import { dropTemplate } from './templates';

export const createScript = (viewObject: View): string => {
  return viewObject.script;
};

export const dropScript = (viewObject: View): string => {
  const { name, owner, grants } = viewObject;
  const viewName = owner ? `${owner}.${name}` : name;

  const dropView = dropTemplate
    .replace('<database_object>', commands.view)
    .replace('<object_name>', viewName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropView};\n${revokeGrants.join(';\n')}`;

};
