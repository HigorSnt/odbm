const constraints = Object.freeze({
  notNull: 'NOT NULL',
  primaryKey: 'PRIMARY KEY',
  unique: 'UNIQUE',
  check: 'CHECK(%s)',
  foreignKey: 'FOREIGN KEY',
});

export { constraints };
