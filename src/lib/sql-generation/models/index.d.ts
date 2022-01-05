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
  grants: Grant[];
}

export interface Argument {
  id: string;
  name: string;
  type: string;
  inOutType: string;
  referenceType: string;
  referenceName: string;
  referenceMethod: string;
  referenceMethodId: string;
}

export interface Function {
  name: string;
  status: string;
  script: string;
  arguments: Argument[];
  grants: Grant[];
}
