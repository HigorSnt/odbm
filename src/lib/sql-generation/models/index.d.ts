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
  owner: string;
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
  owner: string;
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
  owner: string;
  status: string;
  script: string;
  methods: Method[];
  grants: Grant[];
}

export interface Column {
  id: string;
  name: string;
  type: string;
  nullable: boolean;
  comment: string;
  tableName: string;
}

export interface View {
  name: string;
  owner: string;
  status: string;
  script: string;
  columns: Column[];
  grants: Grant[];
}

export interface Trigger {
  name: string;
  owner: string;
  type: string;
  event: string;
  objectBaseType: string;
  objectBaseOwner: string;
  objectBaseName: string;
  triggerStatus: string;
  status: string;
  script: string;
}

export interface Procedure {
  name: string;
  owner: string;
  status: string;
  script: string;
  arguments: Argument[];
  grants: Grant[];
}

export interface Sequence {
  name: string;
  owner: string;
  incrementBy: number;
  cacheSize: number;
  startWith: number;
  script: string;
  minValue: number;
  maxValue: number;
  grants: Grant[];
}

export interface Constraint {
  owner: string;
  tableName: string;
  constraintName: string;
  relatedColumns: string;
  constraintType: string;
  condition: string;
  relatedOwner: string;
  relatedConstraintName: string;
  deleteRule: string;
  invalid: string;
  relatedView: string;
  status: string;
  validated: string;
}

export interface Index {
  indexName: string;
  tableOwner: string;
  tableName: string;
  columns: string;
  indexType: string;
  uniqueness: string;
  compression: string;
  tablespaceName: string;
  status: string;
}

export interface Table {
  owner: string;
  name: string;
  comment: string;
  script: string;
  columns: Column[];
  indexes: Index[];
  constraints: Constraint[];
  grants: Grant[];
}
