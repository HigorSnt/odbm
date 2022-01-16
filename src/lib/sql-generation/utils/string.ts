const formatSpecifier = ['s', 'd'];

export const format = (
  value: string,
  ...params: readonly (number | string)[]
): string => {
  let formattedString = '';
  let tempPattern = '';
  let paramIndex = 0;

  for (const element of value) {
    if ([tempPattern, element].includes('%')) {
      if (tempPattern === '%' && formatSpecifier.includes(element)) {
        if (element === 's') {
          formattedString += params[paramIndex++];
        } else if (element === 'd') {
          formattedString += Number(params[paramIndex])
            ? params[paramIndex++]
            : new Error('Invalid number');
        }

        tempPattern = '';
      } else if (element === '%') {
        tempPattern += '%';
      } else {
        formattedString += tempPattern + element;
      }
    } else {
      formattedString += element;
      tempPattern = '';
    }
  }

  return formattedString;
};
