"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
const formatSpecifier = ['s', 'd'];
// saaaa %s ikvfeijj %d jkndcsj %%
const format = (value, params) => {
    let formattedString = '';
    let tempPattern = '';
    let paramIndex = 0;
    for (const element of value) {
        if ([tempPattern, element].includes('%')) {
            if (tempPattern === '%' && formatSpecifier.includes(element)) {
                if (element === 's') {
                    formattedString += params[paramIndex++];
                }
                else if (element === 'd') {
                    formattedString += Number(params[paramIndex++])
                        ? params[paramIndex++]
                        : new Error('Invalid number');
                }
            }
            else {
                formattedString += element;
            }
            tempPattern = element;
        }
        else {
            formattedString += element;
            tempPattern = '';
        }
    }
    return formattedString;
};
exports.format = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zcWwtZ2VuZXJhdGlvbi91dGlscy9zdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQWlEO0FBQ2pELHNDQUFzQztBQUN0QyxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuQyxrQ0FBa0M7QUFFM0IsTUFBTSxNQUFNLEdBQUcsQ0FDcEIsS0FBYSxFQUNiLE1BQW9DLEVBQzVCLEVBQUU7SUFDVixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDekIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztJQUVuQixLQUFLLE1BQU0sT0FBTyxJQUFJLEtBQUssRUFBRTtRQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QyxJQUFJLFdBQVcsS0FBSyxHQUFHLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDNUQsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFO29CQUNuQixlQUFlLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7aUJBQ3pDO3FCQUFNLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRTtvQkFDMUIsZUFBZSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzt3QkFDN0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7aUJBQU07Z0JBQ0wsZUFBZSxJQUFJLE9BQU8sQ0FBQzthQUM1QjtZQUNELFdBQVcsR0FBRyxPQUFPLENBQUM7U0FDdkI7YUFBTTtZQUNMLGVBQWUsSUFBSSxPQUFPLENBQUM7WUFDM0IsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUNsQjtLQUNGO0lBRUQsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBN0JXLFFBQUEsTUFBTSxVQTZCakIifQ==