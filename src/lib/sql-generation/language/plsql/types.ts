const types = Object.freeze({
  boolean: 'BOOLEAN',
  plsInteger: 'PLS_INTEGER',
  binaryInteger: 'BINARY_INTEGER',
  binaryFloat: 'BINARY_FLOAT',
  binaryDouble: 'BINARY_DOUBLE',
  number: 'NUMBER(%d, %d)', // NUMBER[(precision,scale)]
  dec: 'DEC(%d, %d)',
  decimal: 'DECIMAL(%d, %d)',
  numeric: 'NUMERIC(%d, %d)',
  double: 'DOUBLE PRECISION',
  float: 'FLOAT',
  int: 'INT',
  integer: 'INTEGER',
  smallint: 'SMALLINT',
  real: 'REAL',
  natural: 'NATURAL',
  naturaln: 'NATURALN',
  positive: 'POSITIVE',
  positiven: 'POSITIVEN',
  signType: 'SIGNTYPE',
  char: 'CHAR(%d %s)', // CHAR[(maximum_size [CHAR  |  BYTE] )]
  character: 'CHARACTER',
  varchar: 'VARCHAR',
  varchar2: 'VARCHAR2(%d %s)', // VARCHAR2(maximum_size [CHAR  |  BYTE])
  raw: 'RAW(%d)', // RAW(maximum_size)
  nchar: 'NCHAR(%d)', // NCHAR[(maximum_size)]
  nvarchar2: 'NVARCHAR2(%d)', // NVARCHAR2(maximum_size)
  long: 'LONG',
  longRaw: 'LONG RAW',
  rowId: 'ROWID',
  urowId: 'UROWID',
  string: 'STRING',
  date: 'DATE',
  timestamp: 'TIMESTAMP(%d)', // TIMESTAMP[(precision)]
  timestampWithTimezone: 'TIMESTAMP(%d) WITH TIMEZONE', // TIMESTAMP[(precision)] WITH TIME ZONE
  timestampWithLocalTimezone: 'TIMESTAMP(%d) WITH LOCAL TIMEZONE', // TIMESTAMP[(precision)] WITH LOCAL TIME ZONE
  intervalYearToMonth: 'INTERVAL YEAR(%d) TO MONTH', // INTERVAL YEAR[(precision)] TO MONTH
  intervalDayToSecond: 'INTERVAL DAY(%d) TO SECOND(%d)', // INTERVAL DAY[(leading_precision)] TO SECOND[(fractional_seconds_precision)]
  blob: 'BLOB',
  bfile: 'BFILE',
  clob: 'CLOB',
  nclob: 'NCLOB',
});

export { types };
