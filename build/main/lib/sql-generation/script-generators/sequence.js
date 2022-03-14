import { commands } from '../language/plsql/index.js';
import { DROP_TEMPLATE, SEQUENCE_TEMPLATE, } from '../language/plsql/template/index.js';
import { createScript as createGrantScript, revokeScript as revokeGrantScript, } from './grant.js';
export const createScript = (sequenceObject) => {
    const { name = '', cacheSize, incrementBy = 1, minValue, maxValue, startWith, grants = [], schemaName = '', } = sequenceObject;
    const minValueClause = minValue ? `${commands.minvalue} ${minValue}` : '';
    const maxValueClause = maxValue ? `${commands.maxvalue} ${maxValue}` : '';
    const startWithClause = startWith
        ? `${commands.start} ${commands.with} ${startWith}`
        : '';
    const incrementByClause = `${incrementBy}`;
    const sequenceName = schemaName ? `${schemaName}.${name}` : name;
    const cacheClause = cacheSize
        ? `${commands.cache} ${cacheSize}`
        : `${commands.nocache}`;
    const sequenceScript = SEQUENCE_TEMPLATE.replace('<sequence_name>', sequenceName)
        .replace('<min_value>', minValueClause)
        .replace('<max_value>', maxValueClause)
        .replace('<start_with_value>', startWithClause)
        .replace('<increment_value>', incrementByClause)
        .replace('<cache_value>', cacheClause);
    const grantScripts = grants.map(createGrantScript);
    return `${sequenceScript}\n\n${grantScripts.join('\n\n')}`;
};
export const dropScript = (sequenceObject) => {
    const { name = '', schemaName = '', grants = [] } = sequenceObject;
    const sequenceName = schemaName ? `${schemaName}.${name}` : name;
    const grantRevokes = grants.map(revokeGrantScript);
    const sequenceDrop = DROP_TEMPLATE.replace('<database_object>', commands.sequence).replace('<object_name>', sequenceName);
    return `${sequenceDrop}\n\n${grantRevokes.join('\n\n')}`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NxbC1nZW5lcmF0aW9uL3NjcmlwdC1nZW5lcmF0b3JzL3NlcXVlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixHQUNsQixNQUFNLHFDQUFxQyxDQUFDO0FBRzdDLE9BQU8sRUFDTCxZQUFZLElBQUksaUJBQWlCLEVBQ2pDLFlBQVksSUFBSSxpQkFBaUIsR0FDbEMsTUFBTSxZQUFZLENBQUM7QUFFcEIsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsY0FBd0IsRUFBVSxFQUFFO0lBQy9ELE1BQU0sRUFDSixJQUFJLEdBQUcsRUFBRSxFQUNULFNBQVMsRUFDVCxXQUFXLEdBQUcsQ0FBQyxFQUNmLFFBQVEsRUFDUixRQUFRLEVBQ1IsU0FBUyxFQUNULE1BQU0sR0FBRyxFQUFFLEVBQ1gsVUFBVSxHQUFHLEVBQUUsR0FDaEIsR0FBRyxjQUFjLENBQUM7SUFFbkIsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxRSxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzFFLE1BQU0sZUFBZSxHQUFHLFNBQVM7UUFDL0IsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRTtRQUNuRCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1AsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLFdBQVcsRUFBRSxDQUFDO0lBQzNDLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRSxNQUFNLFdBQVcsR0FBRyxTQUFTO1FBQzNCLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFFO1FBQ2xDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUUxQixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQzlDLGlCQUFpQixFQUNqQixZQUFZLENBQ2I7U0FDRSxPQUFPLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztTQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztTQUN0QyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxDQUFDO1NBQzlDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQztTQUMvQyxPQUFPLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXpDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUVuRCxPQUFPLEdBQUcsY0FBYyxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUM3RCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxjQUF3QixFQUFVLEVBQUU7SUFDN0QsTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLEdBQUcsY0FBYyxDQUFDO0lBQ25FLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUVqRSxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFbkQsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FDeEMsbUJBQW1CLEVBQ25CLFFBQVEsQ0FBQyxRQUFRLENBQ2xCLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUV6QyxPQUFPLEdBQUcsWUFBWSxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUMzRCxDQUFDLENBQUMifQ==