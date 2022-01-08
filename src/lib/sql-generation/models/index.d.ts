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

export interface Method {
  packageName: string;
  methodId: string;
  methodName: string;
  arguments: Argument[];
}

export interface Package {
  name: string;
  status: string;
  script: string;
  methods: Method[];
  grants: Grant[];
}

export interface Column {
  id: string;
  name: string;
  type: string;
  nullable: string;
  comment: string;
  tableName: string;
}

export interface View {
  name: string;
  status: string;
  script: string;
  columns: Column[];
  grants: Grant[];
}

export interface Trigger {
  name: string;
  type: string;
  event: string;
  objectBaseType: string;
  objectBaseOwner: string;
  objectBaseName: string;
  triggerStatus: string;
  status: string;
  script: string;
}
