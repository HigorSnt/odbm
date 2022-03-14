import { commands } from '../language/plsql/index.js';
import { DROP_TEMPLATE, FUNCTION_TEMPLATE, PARAMETER_TEMPLATE, } from '../language/plsql/template/index.js';
import { createScript as createGrantScript, revokeScript as revokeGrantScript, } from './grant.js';
export const createScript = (functionObject) => {
    const { name = '', schemaName = '', grants = [], replace = false, parameters = [], returnType = '', is = false, body = '', } = functionObject;
    const functionName = schemaName ? `${schemaName}.${name}` : name;
    const replaceValue = replace ? `${commands.or} ${commands.replace}` : '';
    const isOrAs = is ? commands.is : commands.as;
    const parametersScripts = createParametersScripts(parameters);
    const grantScripts = grants.map(createGrantScript);
    const functionScript = FUNCTION_TEMPLATE.replace('<replace>', replaceValue)
        .replaceAll('<object_name>', functionName)
        .replace('<parameter>', parametersScripts)
        .replace('<return_type>', returnType)
        .replace('<is_or_as>', isOrAs)
        .replace('<body>', body);
    return `${functionScript}\n\n${grantScripts.join('\n\n')}`;
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
export const dropScript = (functionObject) => {
    const { name = '', schemaName = '', grants = [] } = functionObject;
    const functionName = schemaName ? `${schemaName}.${name}` : name;
    const dropFunction = DROP_TEMPLATE.replace('<database_object>', commands.function).replace('<object_name>', functionName);
    const revokeGrants = grants.map(revokeGrantScript);
    return `${dropFunction}\n\n${revokeGrants.join('\n\n')}`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NxbC1nZW5lcmF0aW9uL3NjcmlwdC1nZW5lcmF0b3JzL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixrQkFBa0IsR0FDbkIsTUFBTSxxQ0FBcUMsQ0FBQztBQUc3QyxPQUFPLEVBQ0wsWUFBWSxJQUFJLGlCQUFpQixFQUNqQyxZQUFZLElBQUksaUJBQWlCLEdBQ2xDLE1BQU0sWUFBWSxDQUFDO0FBRXBCLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxDQUFDLGNBQXdCLEVBQVUsRUFBRTtJQUMvRCxNQUFNLEVBQ0osSUFBSSxHQUFHLEVBQUUsRUFDVCxVQUFVLEdBQUcsRUFBRSxFQUNmLE1BQU0sR0FBRyxFQUFFLEVBQ1gsT0FBTyxHQUFHLEtBQUssRUFDZixVQUFVLEdBQUcsRUFBRSxFQUNmLFVBQVUsR0FBRyxFQUFFLEVBQ2YsRUFBRSxHQUFHLEtBQUssRUFDVixJQUFJLEdBQUcsRUFBRSxHQUNWLEdBQUcsY0FBYyxDQUFDO0lBRW5CLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN6RSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFDOUMsTUFBTSxpQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFbkQsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUM7U0FDeEUsVUFBVSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7U0FDekMsT0FBTyxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQztTQUN6QyxPQUFPLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztTQUNwQyxPQUFPLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQztTQUM3QixPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTNCLE9BQU8sR0FBRyxjQUFjLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQzdELENBQUMsQ0FBQztBQUVGLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxVQUF1QixFQUFVLEVBQUU7SUFDbEUsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBRW5CLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO1FBQ2xDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1FBRXBELE1BQU0sTUFBTSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUM7YUFDaEUsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUM1QyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3pDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN0QjtJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbkMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLENBQUMsY0FBd0IsRUFBVSxFQUFFO0lBQzdELE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLFVBQVUsR0FBRyxFQUFFLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxHQUFHLGNBQWMsQ0FBQztJQUNuRSxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFakUsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FDeEMsbUJBQW1CLEVBQ25CLFFBQVEsQ0FBQyxRQUFRLENBQ2xCLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUV6QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFbkQsT0FBTyxHQUFHLFlBQVksT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDM0QsQ0FBQyxDQUFDIn0=