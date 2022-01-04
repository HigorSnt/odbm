export interface Grant {
  owner: string;
  objectName: string;
  type: string;
  grantor: string;
  grantee: string;
  privilege: string;
  script: string;
}

export interface Type {
  name: string;
  type: string;
  script: string;
  grants: Grant[]
}
