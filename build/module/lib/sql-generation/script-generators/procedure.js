import { commands } from '../language/plsql/index.js';
import { DROP_TEMPLATE, PARAMETER_TEMPLATE, PROCEDURE_TEMPLATE, } from '../language/plsql/template/index.js';
import { createScript as createGrantScript, revokeScript as revokeGrantScript, } from './grant.js';
export const createScript = (procedureObject) => {
    const { replace = false, name = '', schemaName = '', parameters = [], declarations = [], executionBody = [], exceptionBody = [], grants = [], is = false, } = procedureObject;
    const procedureName = schemaName ? `${schemaName}.${name}` : name;
    const replaceValue = replace ? `${commands.or} ${commands.replace}` : '';
    const isOrAs = is ? `${commands.is}` : `${commands.as}`;
    const parameterScript = createParametersScripts(parameters);
    const grantScripts = grants.map(createGrantScript);
    const procedureScript = PROCEDURE_TEMPLATE.replace('<replace>', replaceValue)
        .replaceAll('<object_name>', procedureName)
        .replace('<parameters>', parameterScript)
        .replace('<is_or_as>', isOrAs)
        .replace('<declaration>', declarations.join(';\n'))
        .replace('<execution_body>', executionBody.join(';\n'))
        .replace('<exception_body>', exceptionBody.join(';\n'));
    return `${procedureScript}\n\n${grantScripts.join('\n\n')}`;
};
const createParametersScripts = (parameters) => {
    const scripts = [];
    for (const parameter of parameters) {
        const { name, type, in: inClause, out } = parameter;
        const script = PARAMETER_TEMPLATE.replace('<parameter_name>', name)
            .replace('<in>', inClause ? commands.in : '')
            .replace('<out>', out ? commands.out : '')
            .replace('<type>', type);
        scripts.push(script);
    }
    return `(${scripts.join(', ')})`;
};
export const dropScript = (procedureObject) => {
    const { name = '', schemaName = '', grants = [] } = procedureObject;
    const procedureName = schemaName ? `${schemaName}.${name}` : name;
    const dropProcedure = DROP_TEMPLATE.replace('<database_object>', commands.procedure).replace('<object_name>', procedureName);
    const revokeGrants = grants.map(revokeGrantScript);
    return `${dropProcedure}\n\n${revokeGrants.join('\n\n')}`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2VkdXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zcWwtZ2VuZXJhdGlvbi9zY3JpcHQtZ2VuZXJhdG9ycy9wcm9jZWR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sRUFDTCxhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLGtCQUFrQixHQUNuQixNQUFNLHFDQUFxQyxDQUFDO0FBRzdDLE9BQU8sRUFDTCxZQUFZLElBQUksaUJBQWlCLEVBQ2pDLFlBQVksSUFBSSxpQkFBaUIsR0FDbEMsTUFBTSxZQUFZLENBQUM7QUFFcEIsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsZUFBMEIsRUFBVSxFQUFFO0lBQ2pFLE1BQU0sRUFDSixPQUFPLEdBQUcsS0FBSyxFQUNmLElBQUksR0FBRyxFQUFFLEVBQ1QsVUFBVSxHQUFHLEVBQUUsRUFDZixVQUFVLEdBQUcsRUFBRSxFQUNmLFlBQVksR0FBRyxFQUFFLEVBQ2pCLGFBQWEsR0FBRyxFQUFFLEVBQ2xCLGFBQWEsR0FBRyxFQUFFLEVBQ2xCLE1BQU0sR0FBRyxFQUFFLEVBQ1gsRUFBRSxHQUFHLEtBQUssR0FDWCxHQUFHLGVBQWUsQ0FBQztJQUVwQixNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEUsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDekUsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxR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