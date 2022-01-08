import * as Diff from 'diff';
import { Trigger } from './models';
import { commands } from './language/plsql/index';

interface SanitizedTrigger {
  name: string;
  script: string;
}

const sanitizedObjects = (trigger: Trigger[]): SanitizedTrigger[] => {
  return trigger.map(el => <SanitizedTrigger>{
      name: el.name,
      script: el.script,
    },
  );
};

const generateTriggerSql = (sourceTrigger: Trigger[], targetTrigger: Trigger[]): string[] => {
  let scripts: string[] = [];
  const diff = Diff.diffJson(sanitizedObjects(sourceTrigger), sanitizedObjects(targetTrigger));
  const diffs = diff.filter(d => d.added || d.removed);

  diffs.forEach(diff => {
    const values = diff.value
      .split(',')
      .map(s => s.replace(/[{}]/g, '').trim());

    if (diff.added) {
      /**
       * The old database doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the trigger must be removed and grants revoked.
       *
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const splittedValue = value.split(' ');
          const triggerTermIndex: number = splittedValue.indexOf(commands.trigger);
          const schemaAndTriggerName: string = splittedValue[triggerTermIndex + 1];

          const dropScript = `${commands.drop} ${commands.trigger} ${schemaAndTriggerName};`;
          scripts.push(dropScript);
        }
      });
    } else {
      /**
       * The old db has it and the new one doesn't. So we must create in the new.
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const [, script] = value.split(':');
          const splittedScript = script.split(' ');
          const triggerCommandIndex = splittedScript.indexOf(commands.trigger);
          const [, triggerName] = splittedScript[triggerCommandIndex + 1].split('.');

          const triggerObj = sourceTrigger.filter(trigger => triggerName.includes(trigger.name))[0];

          scripts.push(triggerObj.script);
        }
      });
    }
  });

  return scripts;
};

export default generateTriggerSql;
