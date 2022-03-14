import { syncFunctions, syncPackages, syncProcedure, syncSequence, syncTable, syncTrigger, syncView, } from './syncObjects.js';
export const sqlGeneration = (type, language, sourceObject, targetObject) => {
    switch (type) {
        case 'Functions':
            return syncFunctions(sourceObject, targetObject, language);
        case 'Packages':
            return syncPackages(sourceObject, targetObject, language);
        case 'Views':
            return syncView(sourceObject, targetObject, language);
        case 'Triggers':
            return syncTrigger(sourceObject, targetObject, language);
        case 'Procedures':
            return syncProcedure(sourceObject, targetObject, language);
        case 'Sequences':
            return syncSequence(sourceObject, targetObject, language);
        case 'Tables':
            return syncTable(sourceObject, targetObject, language);
        default:
            throw Error('Invalid Type');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsLWdlbmVyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3NxbC1nZW5lcmF0aW9uL3NxbC1nZW5lcmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixZQUFZLEVBQ1osU0FBUyxFQUNULFdBQVcsRUFDWCxRQUFRLEdBQ1QsTUFBTSxrQkFBa0IsQ0FBQztBQWExQixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsQ0FDM0IsSUFBZ0IsRUFDaEIsUUFBa0IsRUFDbEIsWUFBaUIsRUFDakIsWUFBaUIsRUFDVCxFQUFFO0lBQ1YsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLFdBQVc7WUFDZCxPQUFPLGFBQWEsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdELEtBQUssVUFBVTtZQUNiLE9BQU8sWUFBWSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUQsS0FBSyxPQUFPO1lBQ1YsT0FBTyxRQUFRLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4RCxLQUFLLFVBQVU7WUFDYixPQUFPLFdBQVcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNELEtBQUssWUFBWTtZQUNmLE9BQU8sYUFBYSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0QsS0FBSyxXQUFXO1lBQ2QsT0FBTyxZQUFZLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1RCxLQUFLLFFBQVE7WUFDWCxPQUFPLFNBQVMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pEO1lBQ0UsTUFBTSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDL0I7QUFDSCxDQUFDLENBQUMifQ==