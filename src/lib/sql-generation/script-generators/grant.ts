import { Grant } from '../models';

import { grantTemplate, revokeGrantTemplate } from './templates';

export const createScript = (grantObject: Grant): string => {
  const { privilege, grantor, objectName, grantee } = grantObject;
  const object = grantor ? `${grantor}.${objectName}` : objectName;

  return grantTemplate
    .replace('<privileges>', privilege)
    .replace('<object>', object)
    .replace('<user>', grantee);
};

export const revokeScript = (grantObject: Grant): string => {
  const { privilege, grantor, objectName, grantee } = grantObject;
  const object = grantor ? `${grantor}.${objectName}` : objectName;

  return revokeGrantTemplate
    .replace('<privilege>', privilege)
    .replace('<object>', object)
    .replace('<user>', grantee);
};
