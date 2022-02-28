import { commands } from '../language/plsql';
import { DROP_TEMPLATE, TRIGGER_TEMPLATE } from '../language/plsql/template';
import { Trigger } from '../models';

export const createScript = (triggerObject: Trigger): string => {
  const {
    name,
    schemaName,
    replace,
    event,
    before,
    forEachRow,
    enabled,
    condition,
    declarations,
    executionBody,
    exceptionBody,
  } = triggerObject;

  const triggerName = schemaName ? `${schemaName}.${name}` : name;
  const replaceValue = replace ? `${commands.or} ${commands.replace}` : '';
  const triggerEvent = `${before ? commands.before : commands.after} ${event}`;
  const forEachRowClause = forEachRow
    ? `${commands.for} ${commands.each} ${commands.row}`
    : '';
  const statusClause = enabled ? `${commands.enable}` : `${commands.disable}`;
  const conditionClause = condition ? `${commands.when} ${condition}` : '';

  return TRIGGER_TEMPLATE.replace('<replace>', replaceValue)
    .replaceAll('<object_name>', triggerName)
    .replace('<trigger_event>', triggerEvent)
    .replace('<each_row>', forEachRowClause)
    .replace('<status>', statusClause)
    .replace('<condition>', conditionClause)
    .replace('<declarations>', declarations.join(';\n'))
    .replace('<execution_body>', executionBody.join(';\n'))
    .replace('<exception_body>', exceptionBody.join(';\n'));
};

export const dropScript = (triggerObject: Trigger): string => {
  const { name, schemaName } = triggerObject;
  const triggerName = schemaName ? `${schemaName}.${name}` : name;

  return DROP_TEMPLATE.replace('<database_object>', commands.trigger).replace(
    '<object_name>',
    triggerName
  );
};
