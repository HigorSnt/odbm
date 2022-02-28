import { commands, constraints } from '../language/plsql';
import {
  COLUMN_COMMENT_TEMPLATE,
  COLUMN_TEMPLATE,
  CONSTRAINTS_TEMPLATE,
  DROP_TEMPLATE,
  INDEX_TEMPLATE,
  TABLE_TEMPLATE,
} from '../language/plsql/template';
import { Column, Constraint, Index, Table } from '../models';

import {
  createScript as createGrantScript,
  revokeScript as revokeGrantScript,
} from './grant';

export const createScript = (tableObject: Table): string => {
  const { schemaName, name, columns, constraints, indexes, grants } = tableObject;

  const columnScripts = createColumnsScript(columns);
  const constraintScripts = createConstraintsScript(constraints);
  const indexesScripts = createIndexScript(indexes);
  const tableName = schemaName ? `${schemaName}.${name}` : name;
  const columnComments = createColumnsCommentsScripts(columns);

  let tableScript = TABLE_TEMPLATE
    .replace('<name>', tableName)
    .replace('<columns>', columnScripts);

  tableScript += constraintScripts.length > 0 ? ',' : '';
  tableScript.replace('<constraints>', constraintScripts);
  const grantScripts = grants.map(createGrantScript);

  return `${tableScript}\n${indexesScripts}\n${grantScripts.join('\n')}\n${columnComments}`;
};

const createColumnsScript = (columns: Column[]): string => {
  const scripts: string[] = [];

  for (const column of columns) {
    const { comment, name, tableName } = column;
    const columnName = `${tableName}.${name}`;

    const columnScript = COLUMN_COMMENT_TEMPLATE
      .replace('<object_name>', columnName)
      .replace('<comment>', comment);
    scripts.push(columnScript);
  }

  return scripts.join(',');
};

const createColumnsCommentsScripts = (columns: Column[]): string => {
  const scripts: string[] = [];

  for (const column of columns) {
    const { name, type, nullable } = column;
    const constraint = nullable ? constraints.notNull : '';

    const columnScript = COLUMN_TEMPLATE
      .replace('<column_name>', name)
      .replace('<column_type>', type)
      .replace('<column_constraint>', constraint);
    scripts.push(columnScript);
  }

  return scripts.join(';\n');
};

const createConstraintsScript = (constraintsArr: Constraint[]): string => {
  const scripts = [];

  for (const constraintElement of constraintsArr) {
    const {
      constraintName,
      constraintType,
      relatedColumns,
    } = constraintElement;

    const constraintScript = CONSTRAINTS_TEMPLATE
      .replace('<constraint_name>', constraintName)
      .replace('<constraint_type>', constraintType)
      .replace('<column_names>', `(${relatedColumns})`);

    scripts.push(constraintScript);
  }

  return scripts.join(',');
};

const createIndexScript = (indexes: Index[]): string => {
  const scripts = [];

  for (const index of indexes) {
    const { indexName, schemaName, tableName, columns, uniqueness } = index;
    const isUnique = uniqueness ? `${constraints.unique}` : '';
    const ownerTableName = schemaName ? `${schemaName}.${tableName}` : tableName;

    const indexScript = INDEX_TEMPLATE
      .replace('<is_unique>', isUnique)
      .replace('<index_name>', indexName)
      .replace('<table_name>', ownerTableName)
      .replace('<columns>', `(${columns})`);

    scripts.push(indexScript);
  }

  return scripts.join(',');
};

export const dropScript = (tableObject: Table): string => {
  const { schemaName, name, grants } = tableObject;
  const tableName = schemaName ? `${schemaName}.${name}` : name;

  const dropTable = DROP_TEMPLATE
    .replace('<database_object>', commands.table)
    .replace('<object_name>', tableName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropTable}\n${revokeGrants.join('\n')}`;
};
