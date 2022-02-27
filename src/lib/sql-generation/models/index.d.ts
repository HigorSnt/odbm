export interface Grant {
  schemaName: string;
  objectName: string;
  type: string;
  grantor: string;
  grantee: string;
  privilege: string;
  script: string;
}

export interface Type {
  name: string;
  schemaName: string;
  type: string;
  script: string;
  grants: Grant[];
}

export interface Parameter {
  name: string;
  type: string;
  in: boolean;
  out: boolean;
}

export interface Argument {
  id: string;
  name: string;
  type: string;
  referenceType: string;
  referenceName: string;
  referenceMethod: string;
  referenceMethodId: string;
}

export interface Function {
  name: string;
  schemaName: string;
  replace: boolean;
  returnType: string;
  is: boolean;
  script: string;
  body: string;
  parameters: Parameter[];
  grants: Grant[];
}

export interface Package {
  name: string;
  schemaName: string;
  replace: boolean;
  is: boolean;
  script: string;
  declarations: string;
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
  schemaName: string;
  status: string;
  script: string;
  columns: Column[];
  grants: Grant[];
}

export interface Trigger {
  name: string;
  schemaName: string;
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
  schemaName: string;
  status: string;
  script: string;
  arguments: Argument[];
  grants: Grant[];
}

export interface Sequence {
  name: string;
  schemaName: string;
  incrementBy: number;
  cacheSize: number;
  startWith: number;
  script: string;
  minValue: number;
  maxValue: number;
  grants: Grant[];
}

export interface Constraint {
  schemaName: string;
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
  schemaName: string;
  tableName: string;
  columns: string;
  indexType: string;
  uniqueness: string;
  compression: string;
  tablespaceName: string;
  status: string;
}

export interface Table {
  schemaName: string;
  name: string;
  comment: string;
  script: string;
  columns: Column[];
  indexes: Index[];
  constraints: Constraint[];
  grants: Grant[];
}
