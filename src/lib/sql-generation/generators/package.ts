import { commands } from '../language/plsql';
import { DROP_TEMPLATE, PACKAGE_TEMPLATE } from '../language/plsql/template';
import { Package } from '../models';

import {
  createScript as createGrantScript,
  revokeScript as revokeGrantScript,
} from './grant';

export const createScript = (packageObject: Package): string => {
  const {
    name = '',
    schemaName = '',
    is = false,
    grants = [],
    declarations = '',
    replace = false,
  } = packageObject;

  const packageName = schemaName ? `${schemaName}.${name}` : name;
  const replaceValue = replace ? `${commands.or} ${commands.replace}` : '';
  const isOrAs = is ? commands.is : commands.as;
  const grantScripts = grants.map(createGrantScript);

  const packageScript = PACKAGE_TEMPLATE.replace('<replace>', replaceValue)
    .replaceAll('<object_name>', packageName)
    .replace('<is_or_as>', isOrAs)
    .replace('<declarations>', declarations);

  return `${packageScript}\n\n${grantScripts.join('\n\n')}`;
};

export const dropScript = (packageObject: Package): string => {
  const { name = '', schemaName = '', grants = [] } = packageObject;
  const packageName = schemaName ? `${schemaName}.${name}` : name;

  const dropPackage = DROP_TEMPLATE.replace(
    '<database_object>',
    commands.package
  ).replace('<object_name>', packageName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${revokeGrants.join('\n\n')}\n\n${dropPackage}`;
};
