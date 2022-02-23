import { commands } from '../language/plsql';
import { Trigger } from '../models';

import { dropTemplate } from './templates';

export const createScript = (triggerObject: Trigger): string => {
  return triggerObject.script;
};

export const dropScript = (triggerObject: Trigger): string => {
  const { name, owner } = triggerObject;
  const triggerName = owner ? `${owner}.${name}` : name;

  return dropTemplate
    .replace('<database_object>', commands.trigger)
    .replace('<object_name>', triggerName);
};
