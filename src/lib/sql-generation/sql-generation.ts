import * as workerpool from 'workerpool';

export type Definition =
  | 'Types'
  | 'Functions'
  | 'Packages'
  | 'Views'
  | 'Triggers'
  | 'Procedures'
  | 'Sequences'
  | 'Tables';

export const sqlGeneration = (types: Definition[]): void => {
  const pool = workerpool.pool(__dirname + '/worker.ts');

  types.forEach(type => {
    pool
      .exec('executeGeneration', [type])
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.error(err);
      })
      .then(function () {
        pool.terminate();
      });
  });
};
