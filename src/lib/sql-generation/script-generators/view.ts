import { commands } from '../language/plsql/index.js';
import {
  DROP_TEMPLATE,
  VIEW_TEMPLATE,
} from '../language/plsql/template/index.js';
import { SelectColumn, View } from '../models/index.js';

import {
  createScript as createGrantScript,
  revokeScript as revokeGrantScript,
} from './grant.js';

export const createScript = (viewObject: View): string => {
  const {
    name = '',
    schemaName = '',
    columns = [],
    grants = [],
    conditions = '',
  } = viewObject;

  const viewName = schemaName ? `${schemaName}.${name}` : name;
  const columnsToSelect = generateColumnsClause(columns);
  const fromClause = generateFromClause(columns);
  const grantScripts = grants.map(createGrantScript);

  const viewScript = VIEW_TEMPLATE.replace('<object_name>', viewName)
    .replace('<columns>', columnsToSelect)
    .replace('<tables>', fromClause)
    .replace('<conditions>', conditions);

  return `${viewScript}\n\n${grantScripts.join('\n\n')}`;
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

  for (const column of selectColumns) {
    const {
      tableName = '',
      joinType = '',
      joinCondition = '',
      joinTable = '',
    } = column;
    if (tableName && !fromClause.includes(tableName)) {
      fromClause += `${tableName} `;
      if (joinTable && !fromClause.includes(joinTable)) {
        fromClause += `${joinType} ${joinTable} ${commands.on} ${joinCondition}, `;
      }
      fromClause += ', ';
    }
  }

  return fromClause.slice(0, -2);
};

export const dropScript = (viewObject: View): string => {
  const { name = '', schemaName = '', grants = [] } = viewObject;
  const viewName = schemaName ? `${schemaName}.${name}` : name;

  const dropView = DROP_TEMPLATE.replace(
    '<database_object>',
    commands.view
  ).replace('<object_name>', viewName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropView}\n\n${revokeGrants.join('\n\n')}`;
};
