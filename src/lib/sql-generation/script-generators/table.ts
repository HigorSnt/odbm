import { commands, constraints } from '../language/plsql';
import { Column, Constraint, Index, Table } from '../models';

import {
  createScript as createGrantScript,
  revokeScript as revokeGrantScript,
} from './grant';
import {
  columnTemplate,
  constraintsTemplate,
  dropTemplate,
  indexTemplate,
  tableTemplate,
} from './templates';

export const createScript = (tableObject: Table): string => {
  const { owner, name, columns, constraints, indexes, grants } = tableObject;

  const columnScripts = createColumnsScript(columns);
  const constraintScripts = createConstraintsScript(constraints);
  const indexesScripts = createIndexScript(indexes);
  const tableName = owner ? `${owner}.${name}` : name;

  // eslint-disable-next-line functional/no-let
  let tableScript = tableTemplate
    .replace('<name>', tableName)
    .replace('<columns>', columnScripts);

  tableScript += constraintScripts.length > 0 ? ',' : '';
  tableScript.replace('<constraints>', constraintScripts);
  const grantScripts = grants.map(createGrantScript);

  return `${tableName};\n${indexesScripts};\n${grantScripts.join(';\n')}`;
};

const createColumnsScript = (columns: Column[]): string => {
  const scripts: string[] = [];

  for (const column of columns) {
    const { name, type, nullable } = column;
    const constraint = nullable ? constraints.notNull : '';

    const columnScript = columnTemplate
      .replace('<column_name>', name)
      .replace('<column_type>', type)
      .replace('<column_constraint>', constraint);
    scripts.push(columnScript);
  }

  return scripts.join(',');
};

const createConstraintsScript = (constraintsArr: Constraint[]): string => {
  const scripts = [];

  for (const constraintElement of constraintsArr) {
    const {
      constraintName,
      constraintType,
      relatedColumns,
    } = constraintElement;

    const constraintScript = constraintsTemplate
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
    const { indexName, tableOwner, tableName, columns, uniqueness } = index;
    const isUnique = uniqueness ? `${constraints.unique}` : '';
    const ownerTableName = tableOwner ? `${tableOwner}.${tableName}` : tableName;

    const indexScript = indexTemplate
      .replace('<is_unique>', isUnique)
      .replace('<index_name>', indexName)
      .replace('<table_name>', ownerTableName)
      .replace('<columns>', `(${columns})`);

    scripts.push(indexScript);
  }

  return scripts.join(',');
};

export const dropScript = (tableObject: Table): string => {
  const { owner, name, grants } = tableObject;
  const tableName = owner ? `${owner}.${name}` : name;

  const dropTable = dropTemplate
    .replace('<database_object>', commands.table)
    .replace('<object_name>', tableName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${dropTable};\n${revokeGrants.join(';\n')}`;
};
