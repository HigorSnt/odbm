import { GRANT_TEMPLATE, REVOKE_GRANT_TEMPLATE } from '../language/plsql/template';
import { Grant } from '../models';

export const createScript = (grantObject: Grant): string => {
  const { privilege, grantor, objectName, grantee } = grantObject;
  const object = grantor ? `${grantor}.${objectName}` : objectName;

  return GRANT_TEMPLATE
    .replace('<privileges>', privilege)
    .replace('<object>', object)
    .replace('<user>', grantee);
};

export const revokeScript = (grantObject: Grant): string => {
  const { privilege, grantor, objectName, grantee } = grantObject;
  const object = grantor ? `${grantor}.${objectName}` : objectName;

  return REVOKE_GRANT_TEMPLATE
    .replace('<privilege>', privilege)
    .replace('<object>', object)
    .replace('<user>', grantee);
};
