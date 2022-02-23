import { commands } from '../language/plsql';

export const columnTemplate = `<column_name> <column_type> <column_constraint>`;

export const constraintsTemplate = `${commands.constraint} <constraint_name> <constraint_type> <column_names>`;

export const tableTemplate = `
${commands.create} ${commands.table} <name>(
    <columns>
    <constraints>
);
`;

export const indexTemplate = `${commands.create} <is_unique> ${commands.index}
<index_name> ${commands.on} <table_name> <columns>;`;

export const sequenceTemplate = `
${commands.create} ${commands.sequence} <sequence_name> <min_value>
<max_value> <start_with_value> ${commands.increment} ${commands.by}
<increment_value> ${commands.cache} <cache_value>;
`;

export const grantTemplate =
  `${commands.grant} <privileges> ${commands.on} <object> ${commands.to} <user>`;

export const dropTemplate = `${commands.drop} <database_object> <object_name>`;

export const revokeGrantTemplate = `${commands.revoke} <privilege> ${commands.on}
<object> ${commands.from} <user>`;
