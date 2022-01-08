import * as Diff from 'diff';
import { Sequence, Grant } from './models';
import { commands } from './language/plsql/index';

interface SanitizedSequence {
  name: string;
  script: string;
  grants: string[];
}

const sanitizedObjects = (sequences: Sequence[]): SanitizedSequence[] => {
  return sequences.map(el => <SanitizedSequence>{
      name: el.name,
      script: el.script,
      grants: el.grants.map(grant => grant.script),
    },
  );
};

const generateSequenceSql = (sourceSequence: Sequence[], targetSequence: Sequence[]): string[] => {
  let scripts: string[] = [];
  const diff = Diff.diffJson(sanitizedObjects(sourceSequence), sanitizedObjects(targetSequence));
  const diffs = diff.filter(d => d.added || d.removed);

  diffs.forEach(diff => {
    const values = diff.value
      .split(',')
      .map(s => s.replace(/[{}]/g, '').trim());

    if (diff.added) {
      /**
       * The old database doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the sequence must be removed and grants revoked.
       *
       */
      values.forEach(value => {
        if (value.includes('"script"')) {
          const splittedValue = value.split(' ');
          const sequenceTermIndex: number = splittedValue.indexOf(commands.sequence);
          const schemaAndSequenceName: string = splittedValue[sequenceTermIndex + 1];

          const dropScript = `${commands.drop} ${commands.sequence} ${schemaAndSequenceName};`;
          scripts.push(dropScript);
        } else if (value.includes(commands.grant)) {
          const grants: Grant[] = [];

          if (value.includes('grants')) {
            const [_, grantScript] = value.split(':');
            const grantScripts: string[] = JSON.parse(grantScript);
            grants.concat(targetSequence
              .map(sequence => sequence.grants.filter(grant => grantScripts.includes(grant.script)))
              .reduce((previous, current) => previous.concat(current)));
          } else {
            grants.concat(targetSequence
              .map(sequence => sequence.grants.filter(grant => value.includes(grant.script)))
              .reduce((previous, current) => previous.concat(current)));
          }

          grants.forEach(grant => {
            const revokeGrant = `${commands.revoke} ${grant.privilege} ${commands.on} ` +
              `${grant.owner ? grant.owner + '.' : ''}${grant.objectName} ` +
              `${commands.from} ${grant.grantee}`;
            scripts.push(revokeGrant);
          });
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
          const sequenceCommandIndex = splittedScript.indexOf(commands.sequence);
          const [, sequenceName] = splittedScript[sequenceCommandIndex + 1].split('.');

          const sequenceObj = sourceSequence.filter(sequence => sequenceName.includes(sequence.name))[0];

          scripts.push(sequenceObj.script);
        } else if (value.includes(commands.grant)) {
          const grantScripts: string[] = [];

          if (value.includes('grants')) {
            const [_, grantScript] = value.split(':');
            grantScripts.concat(JSON.parse(grantScript));
          } else {
            grantScripts.push(value.trim());
          }

          scripts.concat(grantScripts);
        }
      });
    }
  });

  return scripts;
};

export default generateSequenceSql;
