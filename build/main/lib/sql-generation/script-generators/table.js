import { commands, constraints } from '../language/plsql/index.js';
import { COLUMN_COMMENT_TEMPLATE, COLUMN_TEMPLATE, CONSTRAINTS_TEMPLATE, DROP_TEMPLATE, INDEX_TEMPLATE, TABLE_TEMPLATE, } from '../language/plsql/template/index.js';
import { createScript as createGrantScript, revokeScript as revokeGrantScript, } from './grant.js';
export const createScript = (tableObject) => {
    const { schemaName = '', name = '', columns = [], constraints = [], indexes = [], grants = [], } = tableObject;
    let columnScripts = createColumnsScript(columns);
    const constraintScripts = createConstraintsScript(constraints);
    const indexesScripts = createIndexScript(indexes);
    const tableName = schemaName ? `${schemaName}.${name}` : name;
    const columnComments = createColumnsCommentsScripts(columns);
    columnScripts += constraintScripts.length > 0 ? ',' : '';
    const tableScript = TABLE_TEMPLATE.replace('<name>', tableName)
        .replace('<columns>', columnScripts)
        .replace('<constraints>', constraintScripts);
    const grantScripts = grants.map(createGrantScript);
    return `${tableScript}\n\n${indexesScripts}\n\n${grantScripts.join('\n\n')}\n${columnComments}`;
};
const createColumnsCommentsScripts = (columns) => {
    const scripts = [];
    for (const column of columns) {
        const { comment, name, tableName } = column;
        const columnName = `${tableName}.${name}`;
        const columnScript = COLUMN_COMMENT_TEMPLATE.replace('<object_name>', columnName).replace('<comment>', comment);
        scripts.push(columnScript);
    }
    return scripts.join('\n');
};
const createColumnsScript = (columns) => {
    const scripts = [];
    for (const column of columns) {
        const { name, type, nullable } = column;
        const constraint = nullable ? constraints.notNull : '';
        const columnScript = COLUMN_TEMPLATE.replace('<column_name>', name)
            .replace('<column_type>', type)
            .replace('<column_constraint>', constraint);
        scripts.push(columnScript);
    }
    return scripts.join(',\n');
};
const createConstraintsScript = (constraintsArr) => {
    const scripts = [];
    for (const constraintElement of constraintsArr) {
        const { constraintName, constraintType, relatedColumns, references, conditions, } = constraintElement;
        const conditionClause = conditions.length > 0 ? `${conditions.join(', ')}` : '';
        const referenceClause = references
            ? `${commands.references} ${references}`
            : '';
        const constraintScript = CONSTRAINTS_TEMPLATE.replace('<constraint_name>', constraintName)
            .replace('<constraint_type>', constraintType)
            .replace('<condition>', conditionClause)
            .replace('<references>', referenceClause)
            .replace('<column_names>', `(${relatedColumns})`);
        scripts.push(constraintScript);
    }
    return scripts.join(',');
};
const createIndexScript = (indexes) => {
    const scripts = [];
    for (const index of indexes) {
        const { indexName, schemaName, tableName, columns, uniqueness } = index;
        const isUnique = uniqueness ? `${constraints.unique}` : '';
        const ownerTableName = schemaName
            ? `${schemaName}.${tableName}`
            : tableName;
        const indexScript = INDEX_TEMPLATE.replace('<is_unique>', isUnique)
            .replace('<index_name>', indexName)
            .replace('<table_name>', ownerTableName)
            .replace('<columns>', `(${columns})`);
        scripts.push(indexScript);
    }
    return scripts.join(',');
};
export const dropScript = (tableObject) => {
    const { schemaName = '', name = '', grants = [] } = tableObject;
    const tableName = schemaName ? `${schemaName}.${name}` : name;
    const dropTable = DROP_TEMPLATE.replace('<database_object>', commands.table).replace('<object_name>', tableName);
    const revokeGrants = grants.map(revokeGrantScript);
    return `${dropTable}\n\n${revokeGrants.join('\n\n')}`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NxbC1nZW5lcmF0aW9uL3NjcmlwdC1nZW5lcmF0b3JzL3RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLGFBQWEsRUFDYixjQUFjLEVBQ2QsY0FBYyxHQUNmLE1BQU0scUNBQXFDLENBQUM7QUFHN0MsT0FBTyxFQUNMLFlBQVksSUFBSSxpQkFBaUIsRUFDakMsWUFBWSxJQUFJLGlCQUFpQixHQUNsQyxNQUFNLFlBQVksQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxXQUFrQixFQUFVLEVBQUU7SUFDekQsTUFBTSxFQUNKLFVBQVUsR0FBRyxFQUFFLEVBQ2YsSUFBSSxHQUFHLEVBQUUsRUFDVCxPQUFPLEdBQUcsRUFBRSxFQUNaLFdBQVcsR0FBRyxFQUFFLEVBQ2hCLE9BQU8sR0FBRyxFQUFFLEVBQ1osTUFBTSxHQUFHLEVBQUUsR0FDWixHQUFHLFdBQVcsQ0FBQztJQUVoQixJQUFJLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRCxNQUFNLGlCQUFpQixHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM5RCxNQUFNLGNBQWMsR0FBRyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxhQUFhLElBQUksaUJBQWlCLENBQUMsTUFBTSxH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