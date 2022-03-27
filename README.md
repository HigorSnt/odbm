# 🔃 DbS

## Introduction

DbS, Database Synchronizer, is a PoC about the idea of creating a tool that allows to facilitate the synchronization of data models. It's operation consists of comparing two JSONs representing the data models and, based on the differences between them, generate SQL scripts that perform the synchronization.
Some important details:
  - current only supports `PL/SQL` syntax
  - currently only supports `CREATE` and `DROP` object commands
  - currently the objects that are supported are:
    - `function`
    - `grant`
    - `package`
    - `procedure`
    - `sequence`
    - `table`
    - `trigger`
    - `view`

## Installation

> ⚠️ Prerequisite:  
> - [Node.js](https://nodejs.dev/) (>= 12.0.0)

> ⚠️ ATTENTION:  
>   🚦 This is an experimental tool and is under construction 🚧, so there are limitations and the possibility of errors

You can install DbS using npm:
```shell
$ npm install dbs-sync
```
or using yarn:
```shell
$ yarn add dbs-sync
```

## Models

Each object has an expected entity model, which contains important information for script generation.  
Below are the expected models:

```js
export interface Grant {
  schemaName: string;
  objectName: string;
  type: string;
  grantor: string;
  grantee: string;
  privilege: string;
  script: string;
}

export interface Parameter {
  name: string;
  type: string;
  in: boolean;
  out: boolean;
}

export interface Function {
  name: string;
  schemaName: string;
  replace: boolean;
  returnType: string;
  is: boolean;
  script: string;
  body: string;
  declarations: string[];
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
  name: string;
  type: string;
  nullable: boolean;
  comment: string;
  tableName: string;
  schemaName: string;
}

export interface SelectColumn {
  name: string;
  tableName: string;
  joinTable: string;
  joinType: 'JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN';
  joinCondition: string;
}

export interface View {
  name: string;
  schemaName: string;
  script: string;
  columns: SelectColumn[];
  conditions: string;
  grants: Grant[];
}

export interface Trigger {
  name: string;
  tableName: string;
  schemaName: string;
  replace: string;
  before: boolean;
  event: string;
  forEachRow: boolean;
  enabled: boolean;
  condition: string;
  declarations: string[];
  executionBody: string[];
  exceptionBody: string[];
  script: string;
}

export interface Procedure {
  name: string;
  schemaName: string;
  replace: boolean;
  script: string;
  is: boolean;
  declarations: string[];
  executionBody: string[];
  exceptionBody: string[];
  parameters: Parameter[];
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
  conditions: string[];
  references: string;
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
  uniqueness: boolean;
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
```

## Usage

```js
import sqlGeneration from 'dbs-sync';

const sourceModel = [
  {
    "schemaName": "",
    "name": "author",
    "comment": "",
    "script": "CREATE TABLE author(\n  id NUMBER NOT NULL,\n  author_name VARCHAR2(150) NOT NULL,\n  birth_date DATE\n);",
    "columns": [
      {
        "name": "id",
        "type": "NUMBER",
        "nullable": false,
        "comment": "",
        "tableName": "author"
      },
      {
        "name": "author_name",
        "type": "VARCHAR2(150)",
        "nullable": false,
        "comment": "",
        "tableName": "author"
      },
      {
        "name": "birth_date",
        "type": "DATE",
        "nullable": true,
        "comment": "",
        "tableName": "author"
      }
    ],
    "indexes": [],
    "grants": [
      {
        "schemaName": "",
        "objectName": "author",
        "type": "TABLE",
        "grantor": "",
        "grantee": "public",
        "privilege": "SELECT",
        "script": "GRANT SELECT ON author TO public;"
      }
    ]
  }
];

const targetModel = [];

const result = sqlGeneration(
  "Tables", // the type of object that will be synchronized
  "plsql", // the syntax of the database in which you want the scripts
  sourceModel, // the data source model
  targetModel // the target model of the changes
);
console.log(result);
/*
CREATE TABLE author(
  id NUMBER NOT NULL,
  author_name VARCHAR2(150) NOT NULL,
  birth_date DATE
);

GRANT
SELECT
  ON author TO PUBLIC;
*/
```
