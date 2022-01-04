import { Grant, Type } from './models';
import { commands } from './language/plsql/index';

const generateTypeSql = (diffs: Diff.Change[], sourceTypes: Type[], targetTypes: Type[]): string[] => {
  let scripts: string[] = [];

  diffs.forEach(diff => {
    const typeNames: string[] = [];
    const values = diff.value.split(/[:,]+/);

    values.forEach((element, index) =>
      element.includes('name') ?
        typeNames.push(values[index + 1].trim().replace(new RegExp('"', 'g'), ''))
        : null);

    if (diff.added) {
      /**
       * The old bank doesn't have it and the new one does.
       * As we are wanting to make the new one the same as the old one,
       * the type must be removed and grants revoked.
       *
       */
      const types = targetTypes.filter((el: Type) => typeNames.includes(el.name.trim()));

      types.forEach((el: Type) => {
        const typeTermIndex: number = el.script.split(' ').indexOf(commands.type);
        const [schema] = el.script.split(' ')[typeTermIndex + 1].split('.');
        const dropScript = `${commands.drop} ${commands.type} ${schema ? schema + '.' : ''}"${el.name}"`;

        scripts.push(dropScript);

        el.grants.forEach((grant: Grant) => {
          const revokeGrant = `${commands.revoke} ${grant.privilege} ${commands.on} ${grant.owner ? grant.owner + '.' : ''}${grant.objectName} ${commands.from} ${grant.grantee}`;
          scripts.push(revokeGrant);
        });
      });
    } else {
      /**
       * The old bank has it and the new one doesn't. So we must create in the new.
       */
      const types = sourceTypes.filter((el: any) => typeNames.includes(el.name.trim()));

      types.forEach((el: any) => {
        scripts.push(el.script.trim());
        el.grants.forEach((grant: any) => scripts.push(grant.script));
      });
    }
  });

  return scripts;
};

export default generateTypeSql;
