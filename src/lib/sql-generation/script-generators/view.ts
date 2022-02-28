import { commands } from '../language/plsql';
import { DROP_TEMPLATE, VIEW_TEMPLATE } from '../language/plsql/template';
import { SelectColumn, View } from '../models';

import {
  createScript as createGrantScript,
  revokeScript as revokeGrantScript,
} from './grant';

export const createScript = (viewObject: View): string => {
  const { name, schemaName, columns, grants, conditions } = viewObject;

  const viewName = schemaName ? `${schemaName}.${name}` : name;
  const columnsToSelect = generateColumnsClause(columns);
  const fromClause = generateFromClause(columns);
  const grantScripts = grants.map(createGrantScript);

  const viewScript = VIEW_TEMPLATE.replace('<object_name>', viewName)
    .replace('<columns>', columnsToSelect)
    .replace('<tables>', fromClause)
    .replace('<conditions>', conditions);

  return `${viewScript}\n${grantScripts.join('\n')}`;
};

const generateColumnsClause = (selectColumns: SelectColumn[]): string => {
  const columns = [];

  for (const { name, tableName } of selectColumns) {
    const column = `${tableName}.${name}`;
    columns.push(column);
  }

  return columns.join(', ');
};

const generateFromClause = (selectColumns: SelectColumn[]): string => {
  let fromClause = '';

  for (const {
    tableName,
    joinType,
    joinCondition,
    joinTable,
  } of selectColumns) {
    if (!fromClause.includes(tableName) && !fromClause.includes(joinTable)) {
      fromClause += `${tableName} ${joinType} ${joinTable} ${commands.on} ${joinCondition} `;
    }
  }

  return fromClause;
};

export const dropScript = (viewObject: View): string => {
  const { name, schemaName, grants } = viewObject;
  const viewName = schemaName ? `${schemaName}.${name}` : name;

  const dropView = DROP_TEMPLATE.replace(
    '<database_object>',
    commands.view,
  ).replace('<object_name>', viewName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropView}\n${revokeGrants.join('\n')}`;
};
