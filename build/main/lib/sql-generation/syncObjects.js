import { format } from 'sql-formatter';
import { generateDiff } from '../json-diff/index.js';
import { functionGeneration, packageGeneration, procedureGeneration, sequenceGeneration, tableGeneration, triggerGeneration, viewGeneration, } from './script-generators/index.js';
const formatOptions = (language) => ({
    language,
    uppercase: true,
    linesBetweenQueries: 2,
});
export const syncFunctions = (sourceFunctions, targetFunctions, language) => {
    const diffs = generateDiff(sourceFunctions, targetFunctions);
    const scripts = [];
    for (const objDiff of diffs) {
        if (objDiff.added) {
            const script = functionGeneration.createScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
        else if (objDiff.removed) {
            const script = functionGeneration.dropScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
    }
    return format(scripts.join('\n\n'), formatOptions(language));
};
export const syncPackages = (sourcePackages, targetPackages, language) => {
    const diffs = generateDiff(sourcePackages, targetPackages);
    const scripts = [];
    for (const objDiff of diffs) {
        if (objDiff.added) {
            const script = packageGeneration.createScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
        else if (objDiff.removed) {
            const script = packageGeneration.dropScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
    }
    return format(scripts.join('\n\n'), formatOptions(language));
};
export const syncProcedure = (sourceProcedures, targetProcedures, language) => {
    const diffs = generateDiff(sourceProcedures, targetProcedures);
    const scripts = [];
    for (const objDiff of diffs) {
        if (objDiff.added) {
            const script = procedureGeneration.createScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
        else if (objDiff.removed) {
            const script = procedureGeneration.dropScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
    }
    return format(scripts.join('\n\n'), formatOptions(language));
};
export const syncSequence = (sourceSequences, targetSequences, language) => {
    const diffs = generateDiff(sourceSequences, targetSequences);
    const scripts = [];
    for (const objDiff of diffs) {
        if (objDiff.added) {
            const script = sequenceGeneration.createScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
        else if (objDiff.removed) {
            const script = sequenceGeneration.dropScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
    }
    return format(scripts.join('\n\n'), formatOptions(language));
};
export const syncTable = (sourceTables, targetTables, language) => {
    const diffs = generateDiff(sourceTables, targetTables);
    const scripts = [];
    for (const objDiff of diffs) {
        if (objDiff.added) {
            const script = tableGeneration.createScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
        else if (objDiff.removed) {
            const script = tableGeneration.dropScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
    }
    return format(scripts.join('\n\n'), formatOptions(language));
};
export const syncTrigger = (sourceTriggers, targetTriggers, language) => {
    const diffs = generateDiff(sourceTriggers, targetTriggers);
    const scripts = [];
    for (const objDiff of diffs) {
        if (objDiff.added) {
            const script = triggerGeneration.createScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
        else if (objDiff.removed) {
            const script = triggerGeneration.dropScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
    }
    return format(scripts.join('\n\n'), formatOptions(language));
};
export const syncView = (sourceViews, targetViews, language) => {
    const diffs = generateDiff(sourceViews, targetViews);
    const scripts = [];
    for (const objDiff of diffs) {
        if (objDiff.added) {
            const script = viewGeneration.createScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
        else if (objDiff.removed) {
            const script = viewGeneration.dropScript(JSON.parse(objDiff.value));
            scripts.push(script);
        }
    }
    return format(scripts.join('\n\n'), formatOptions(language));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY09iamVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3NxbC1nZW5lcmF0aW9uL3N5bmNPYmplY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBUSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVczRCxPQUFPLEVBQ0wsa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsY0FBYyxHQUNmLE1BQU0sOEJBQThCLENBQUM7QUFHdEMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxRQUFrQixFQUFpQixFQUFFLENBQUMsQ0FBQztJQUM1RCxRQUFRO0lBQ1IsU0FBUyxFQUFFLElBQUk7SUFDZixtQkFBbUIsRUFBRSxDQUFDO0NBQ3ZCLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxDQUMzQixlQUEyQixFQUMzQixlQUEyQixFQUMzQixRQUFrQixFQUNWLEVBQUU7SUFDVixNQUFNLEtBQUssR0FBVyxZQUFZLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztJQUU3QixLQUFLLE1BQU0sT0FBTyxJQUFJLEtBQUssRUFBRTtRQUMzQixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDakIsTUFBTSxNQUFNLEdBQUcsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0QjthQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUMxQixNQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxVQUFV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QUU3QixLQUFLLE1BQU0sT0FBTyxJQUFJLEtBQUssRUFBRTtRQUMzQixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDakIsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEI7YUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDMUIsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEI7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQyxDQUFDIn0=