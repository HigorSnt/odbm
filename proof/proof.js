import fs from "fs";
import { dirname } from "path";

import sqlGeneration from "dbs";

// Functions
import functionSourceTest1 from './test/in/functions/test_1/source.json';
import functionTargetTest1 from './test/in/functions/test_1/target.json';
import functionSourceTest2 from './test/in/functions/test_2/source.json';
import functionTargetTest2 from './test/in/functions/test_2/target.json';
import functionSourceTest3 from './test/in/functions/test_3/source.json';
import functionTargetTest3 from './test/in/functions/test_3/target.json';

// Packages
import packageSourceTest1 from './test/in/package/test_1/source.json';
import packageTargetTest1 from './test/in/package/test_1/target.json';
import packageSourceTest2 from './test/in/package/test_2/source.json';
import packageTargetTest2 from './test/in/package/test_2/target.json';
import packageSourceTest3 from './test/in/package/test_3/source.json';
import packageTargetTest3 from './test/in/package/test_3/target.json';

// Procedure
import procedureSourceTest1 from './test/in/procedure/test_1/source.json';
import procedureTargetTest1 from './test/in/procedure/test_1/target.json';
import procedureSourceTest2 from './test/in/procedure/test_2/source.json';
import procedureTargetTest2 from './test/in/procedure/test_2/target.json';
import procedureSourceTest3 from './test/in/procedure/test_3/source.json';
import procedureTargetTest3 from './test/in/procedure/test_3/target.json';

// Sequence
import sequenceSourceTest1 from './test/in/sequence/test_1/source.json';
import sequenceTargetTest1 from './test/in/sequence/test_1/target.json';
import sequenceSourceTest2 from './test/in/sequence/test_2/source.json';
import sequenceTargetTest2 from './test/in/sequence/test_2/target.json';
import sequenceSourceTest3 from './test/in/sequence/test_3/source.json';
import sequenceTargetTest3 from './test/in/sequence/test_3/target.json';

// Table
import tableSourceTest1 from './test/in/table/test_1/source.json';
import tableTargetTest1 from './test/in/table/test_1/target.json';
import tableSourceTest2 from './test/in/table/test_2/source.json';
import tableTargetTest2 from './test/in/table/test_2/target.json';
import tableSourceTest3 from './test/in/table/test_3/source.json';
import tableTargetTest3 from './test/in/table/test_3/target.json';

// Trigger
import triggerSourceTest1 from './test/in/trigger/test_1/source.json';
import triggerTargetTest1 from './test/in/trigger/test_1/target.json';
import triggerSourceTest2 from './test/in/trigger/test_2/source.json';
import triggerTargetTest2 from './test/in/trigger/test_2/target.json';
import triggerSourceTest3 from './test/in/trigger/test_3/source.json';
import triggerTargetTest3 from './test/in/trigger/test_3/target.json';

// Views
import viewSourceTest1 from "./test/in/view/test_1/source.json";
import viewTargetTest1 from "./test/in/view/test_1/target.json";
import viewSourceTest2 from "./test/in/view/test_2/source.json";
import viewTargetTest2 from "./test/in/view/test_2/target.json";
import viewSourceTest3 from "./test/in/view/test_3/source.json";
import viewTargetTest3 from "./test/in/view/test_3/target.json";

const writeResult = (path, content) => {
  fs.mkdirSync(dirname(path), { recursive: true });

  if (fs.existsSync(dirname(path))) {
    fs.writeFileSync(path, content);
  }
};

const functionTest1 = sqlGeneration(
  "Functions",
  "plsql",
  functionSourceTest1,
  functionTargetTest1
);
writeResult("./test/out/functions/test_1/result.sql", functionTest1);

const functionTest2 = sqlGeneration(
  "Functions",
  "plsql",
  functionSourceTest2,
  functionTargetTest2
);
writeResult("./test/out/functions/test_2/result.sql", functionTest2);

const functionTest3 = sqlGeneration(
  "Functions",
  "plsql",
  functionSourceTest3,
  functionTargetTest3
);
writeResult("./test/out/functions/test_3/result.sql", functionTest3);

const packageTest1 = sqlGeneration(
  "Packages",
  "plsql",
  packageSourceTest1,
  packageTargetTest1
);
writeResult("./test/out/package/test_1/result.sql", packageTest1);

const packageTest2 = sqlGeneration(
  "Packages",
  "plsql",
  packageSourceTest2,
  packageTargetTest2
);
writeResult("./test/out/package/test_2/result.sql", packageTest2);

const packageTest3 = sqlGeneration(
  "Packages",
  "plsql",
  packageSourceTest3,
  packageTargetTest3
);
writeResult("./test/out/package/test_3/result.sql", packageTest3);

const procedureTest1 = sqlGeneration(
  "Procedures",
  "plsql",
  procedureSourceTest1,
  procedureTargetTest1
);
writeResult("./test/out/procedure/test_1/result.sql", procedureTest1);

const procedureTest2 = sqlGeneration(
  "Procedures",
  "plsql",
  procedureSourceTest2,
  procedureTargetTest2
);
writeResult("./test/out/procedure/test_2/result.sql", procedureTest2);

const procedureTest3 = sqlGeneration(
  "Procedures",
  "plsql",
  procedureSourceTest3,
  procedureTargetTest3
);
writeResult("./test/out/procedure/test_3/result.sql", procedureTest3);

const sequenceTest1 = sqlGeneration(
  "Sequences",
  "plsql",
  sequenceSourceTest1,
  sequenceTargetTest1
);
writeResult("./test/out/sequence/test_1/result.sql", sequenceTest1);

const sequenceTest2 = sqlGeneration(
  "Sequences",
  "plsql",
  sequenceSourceTest2,
  sequenceTargetTest2
);
writeResult("./test/out/sequence/test_2/result.sql", sequenceTest2);

const sequenceTest3 = sqlGeneration(
  "Sequences",
  "plsql",
  sequenceSourceTest3,
  sequenceTargetTest3
);
writeResult("./test/out/sequence/test_3/result.sql", sequenceTest3);

const tableTest1 = sqlGeneration(
  "Tables",
  "plsql",
  tableSourceTest1,
  tableTargetTest1
);
writeResult("./test/out/table/test_1/result.sql", tableTest1);

const tableTest2 = sqlGeneration(
  "Tables",
  "plsql",
  tableSourceTest2,
  tableTargetTest2
);
writeResult("./test/out/table/test_2/result.sql", tableTest2);

const tableTest3 = sqlGeneration(
  "Tables",
  "plsql",
  tableSourceTest3,
  tableTargetTest3
);
writeResult("./test/out/table/test_3/result.sql", tableTest3);

const triggerTest1 = sqlGeneration(
  "Triggers",
  "plsql",
  triggerSourceTest1,
  triggerTargetTest1
);
writeResult("./test/out/trigger/test_1/result.sql", triggerTest1);

const triggerTest2 = sqlGeneration(
  "Triggers",
  "plsql",
  triggerSourceTest2,
  triggerTargetTest2
);
writeResult("./test/out/trigger/test_2/result.sql", triggerTest2);

const triggerTest3 = sqlGeneration(
  "Triggers",
  "plsql",
  triggerSourceTest3,
  triggerTargetTest3
);
writeResult("./test/out/trigger/test_3/result.sql", triggerTest3);

const viewTest1 = sqlGeneration(
  "Views",
  "plsql",
  viewSourceTest1,
  viewTargetTest1
);
writeResult("./test/out/view/test_1/result.sql", viewTest1);

const viewTest2 = sqlGeneration(
  "Views",
  "plsql",
  viewSourceTest2,
  viewTargetTest2
);
writeResult("./test/out/view/test_2/result.sql", viewTest2);

const viewTest3 = sqlGeneration(
  "Views",
  "plsql",
  viewSourceTest3,
  viewTargetTest3
);
writeResult("./test/out/view/test_3/result.sql", viewTest3);
