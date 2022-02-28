import { commands } from '../language/plsql';
import { DROP_TEMPLATE, SEQUENCE_TEMPLATE } from '../language/plsql/template';
import { Sequence } from '../models';

import {
  createScript as createGrantScript,
  revokeScript as revokeGrantScript,
} from './grant';

export const createScript = (sequenceObject: Sequence): string => {
  const {
    name,
    cacheSize,
    incrementBy,
    minValue,
    maxValue,
    startWith,
    grants,
    schemaName,
  } = sequenceObject;

  const minValueClause = minValue ? `${commands.minvalue} ${minValue}` : '';
  const maxValueClause = maxValue ? `${commands.maxvalue} ${maxValue}` : '';
  const startWithClause = startWith ? `${commands.start} ${commands.with} ${startWith}` : '';
  const incrementByClause = incrementBy ? `${commands.increment} ${commands.by} ${incrementBy}` : '';
  const sequenceName = schemaName ? `${schemaName}.${name}` : name;

  const sequenceScript = SEQUENCE_TEMPLATE
    .replace('<sequence_name>', sequenceName)
    .replace('<min_value>', minValueClause)
    .replace('<max_value>', maxValueClause)
    .replace('<start_with_value>', startWithClause)
    .replace('<increment_value>', incrementByClause)
    .replace('<cache_value>', cacheSize.toString());

  const grantScripts = grants.map(createGrantScript);

  return `${sequenceScript};\n${grantScripts.join('\n')}`;
};

export const dropScript = (sequenceObject: Sequence): string => {
  const { name, schemaName, grants } = sequenceObject;
  const sequenceName = schemaName ? `${schemaName}.${name}` : name;

  const grantRevokes = grants.map(revokeGrantScript);

  const sequenceDrop = DROP_TEMPLATE
    .replace('<database_object>', commands.sequence)
    .replace('<object_name>', sequenceName);

  return `${sequenceDrop}\n${grantRevokes.join('\n')}`;
};
