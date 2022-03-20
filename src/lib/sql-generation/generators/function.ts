import { commands } from '../language/plsql';
import {
  DROP_TEMPLATE,
  FUNCTION_TEMPLATE,
  PARAMETER_TEMPLATE,
} from '../language/plsql/template';
import { Function, Parameter } from '../models';

import {
  createScript as createGrantScript,
  revokeScript as revokeGrantScript,
} from './grant';

export const createScript = (functionObject: Function): string => {
  const {
    name = '',
    schemaName = '',
    grants = [],
    replace = false,
    parameters = [],
    returnType = '',
    is = false,
    body = '',
    declarations = [],
  } = functionObject;

  const functionName = schemaName ? `${schemaName}.${name}` : name;
  const replaceValue = replace ? `${commands.or} ${commands.replace}` : '';
  const isOrAs = is ? commands.is : commands.as;
  const parametersScripts = createParametersScripts(parameters);
  const grantScripts = grants.map(createGrantScript);
  const declarationsClause =
    declarations.length > 0 ? `${declarations.join(',')};` : '';

  const functionScript = FUNCTION_TEMPLATE.replace('<replace>', replaceValue)
    .replaceAll('<object_name>', functionName)
    .replace('<parameter>', parametersScripts)
    .replace('<return_type>', returnType)
    .replace('<is_or_as>', isOrAs)
    .replace('<declarations>', declarationsClause)
    .replace('<body>', body);

  return `${functionScript}\n\n${grantScripts.join('\n\n')}`;
};

const createParametersScripts = (parameters: Parameter[]): string => {
  const scripts = [];

  for (const parameter of parameters) {
    const { name, type, in: inClause, out } = parameter;

    const script = PARAMETER_TEMPLATE.replace('<parameter_name>', name)
      .replace('<in>', inClause ? commands.in : '')
      .replace('<out>', out ? commands.out : '')
      .replace('<type>', type);
    scripts.push(script);
  }

  return `(${scripts.join(', ')})`;
};

export const dropScript = (functionObject: Function): string => {
  const { name = '', schemaName = '', grants = [] } = functionObject;
  const functionName = schemaName ? `${schemaName}.${name}` : name;

  const dropFunction = DROP_TEMPLATE.replace(
    '<database_object>',
    commands.function
  ).replace('<object_name>', functionName);

  const revokeGrants = grants.map(revokeGrantScript);

  return `${revokeGrants.join('\n\n')}\n\n${dropFunction}`;
};
