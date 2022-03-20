import { commands } from '../language/plsql';
import { DROP_TEMPLATE, SEQUENCE_TEMPLATE } from '../language/plsql/template';
import { Sequence } from '../models';

import {
  createScript as createGrantScript,
  revokeScript as revokeGrantScript,
} from './grant';

export const createScript = (sequenceObject: Sequence): string => {
  const {
    name = '',
    cacheSize,
    incrementBy = 1,
    minValue,
    maxValue,
    startWith,
    grants = [],
    schemaName = '',
  } = sequenceObject;

  const minValueClause = minValue ? `${commands.minvalue} ${minValue}` : '';
  const maxValueClause = maxValue ? `${commands.maxvalue} ${maxValue}` : '';
  const startWithClause = startWith
    ? `${commands.start} ${commands.with} ${startWith}`
    : '';
  const incrementByClause = `${incrementBy}`;
  const sequenceName = schemaName ? `${schemaName}.${name}` : name;
  const cacheClause = cacheSize
    ? `${commands.cache} ${cacheSize}`
    : `${commands.nocache}`;

  const sequenceScript = SEQUENCE_TEMPLATE.replace(
    '<sequence_name>',
    sequenceName
  )
    .replace('<min_value>', minValueClause)
    .replace('<max_value>', maxValueClause)
    .replace('<start_with_value>', startWithClause)
    .replace('<increment_value>', incrementByClause)
    .replace('<cache_value>', cacheClause);

  const grantScripts = grants.map(createGrantScript);

  return `${sequenceScript}\n\n${grantScripts.join('\n\n')}`;
};

export const dropScript = (sequenceObject: Sequence): string => {
  const { name = '', schemaName = '', grants = [] } = sequenceObject;
  const sequenceName = schemaName ? `${schemaName}.${name}` : name;

  const grantRevokes = grants.map(revokeGrantScript);

  const sequenceDrop = DROP_TEMPLATE.replace(
    '<database_object>',
    commands.sequence
  ).replace('<object_name>', sequenceName);

  return `${grantRevokes.join('\n\n')}\n\n${sequenceDrop}`;
};
