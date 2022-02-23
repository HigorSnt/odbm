import { commands } from '../language/plsql';
import { Sequence } from '../models';

import {
  createScript as createGrantScript,
  revokeScript as revokeGrantScript,
} from './grant';
import { dropTemplate, sequenceTemplate } from './templates';

export const createScript = (sequenceObject: Sequence): string => {
  const {
    name,
    cacheSize,
    incrementBy,
    minValue,
    maxValue,
    startWith,
    grants,
    owner,
  } = sequenceObject;

  const minValueClause = minValue ? `${commands.minvalue} ${minValue}` : '';
  const maxValueClause = maxValue ? `${commands.maxvalue} ${maxValue}` : '';
  const startWithClause = startWith ? `${commands.start} ${commands.with} ${startWith}` : '';
  const incrementByClause = incrementBy ? `${commands.increment} ${commands.by} ${incrementBy}` : '';
  const sequenceName = owner ? `${owner}.${name}` : name;

  const sequenceScript = sequenceTemplate
    .replace('<sequence_name>', sequenceName)
    .replace('<min_value>', minValueClause)
    .replace('<max_value>', maxValueClause)
    .replace('<start_with_value>', startWithClause)
    .replace('<increment_value>', incrementByClause)
    .replace('<cache_value>', cacheSize.toString());

  const grantScripts = grants.map(createGrantScript);

  return `${sequenceScript};\n${grantScripts.join(';\n')}`;
};

export const dropScript = (sequenceObject: Sequence): string => {
  const { name, owner, grants } = sequenceObject;
  const sequenceName = owner ? `${owner}.${name}` : owner;

  const grantRevokes = grants.map(revokeGrantScript);

  const sequenceDrop = dropTemplate
    .replace('<database_object>', commands.sequence)
    .replace('<object_name>', sequenceName);

  return `${sequenceDrop};\n${grantRevokes.join(';\n')}`;
};
