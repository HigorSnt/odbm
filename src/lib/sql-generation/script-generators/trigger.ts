import { commands } from '../language/plsql/index.js';
import { DROP_TEMPLATE, TRIGGER_TEMPLATE } from '../language/plsql/template/index.js';
import { Trigger } from '../models/index.js';

export const createScript = (triggerObject: Trigger): string => {
  const {
    name = '',
    schemaName = '',
    replace = '',
    event = '',
    before = false,
    forEachRow = false,
    enabled = false,
    condition = '',
    declarations = [],
    executionBody = [],
    exceptionBody = [],
    tableName = '',
  } = triggerObject;

  const triggerName = schemaName ? `${schemaName}.${name}` : name;
  const replaceValue = replace ? `${commands.or} ${commands.replace}` : '';
  const triggerEvent = `${before ? commands.before : commands.after} ${event}`;
  const forEachRowClause = forEachRow
    ? `${commands.for} ${commands.each} ${commands.row}`
    : '';
  const statusClause = enabled ? `${commands.enable}` : `${commands.disable}`;
  const conditionClause = condition ? `${commands.when} ${condition}` : '';
  const declarationClause = declarations.length > 0 ? `${commands.declare} ${declarations.join(';\n')}` : '';

  return TRIGGER_TEMPLATE.replace('<replace>', replaceValue)
    .replaceAll('<object_name>', triggerName)
    .replace('<table_name>', tableName)
    .replace('<trigger_event>', triggerEvent)
    .replace('<each_row>', forEachRowClause)
    .replace('<status>', statusClause)
    .replace('<condition>', conditionClause)
    .replace('<declarations>', declarationClause)
    .replace('<execution_body>', executionBody.join(';\n'))
    .replace('<exception_body>', exceptionBody.join(';\n'));
};

export const dropScript = (triggerObject: Trigger): string => {
  const { name = '', schemaName = '' } = triggerObject;
  const triggerName = schemaName ? `${schemaName}.${name}` : name;

  return DROP_TEMPLATE.replace('<database_object>', commands.trigger).replace(
    '<object_name>',
    triggerName
  );
};
