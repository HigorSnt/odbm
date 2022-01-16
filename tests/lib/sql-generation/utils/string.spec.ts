import { format } from '../../../../src/lib/sql-generation/utils/string';

describe('format', () => {
  it('should format a string with all parameters with type string', () => {
    const string = 'Shopping List\n* %s\n* %s\n* %s';
    const expected = 'Shopping List\n* Meat\n* Sugar\n* Beans';

    const result = format(string, 'Meat', 'Sugar', 'Beans');
    expect(result).toEqual(expected);
  });

  it('should format a string with all parameters with type number', () => {
    const expected = 'Shopping List\n1 - Meat\n2 - Sugar\n3 - Beans';

    const result = format('Shopping List\n%d - Meat\n%d - Sugar\n%d - Beans', 1, 2, 3);
    expect(result).toEqual(expected);
  });

  it('should format the string with parameters of multiple types', () => {
    const string = 'Shopping List\n%d - %s\n%d - %s\n%d - %s';
    const params = [1, 'Meat', 2, 'Sugar', 3, 'Beans'];
    const expected = 'Shopping List\n1 - Meat\n2 - Sugar\n3 - Beans';

    const result = format(string, ...params);
    expect(result).toEqual(expected);
  });

  it('should place the text if it\'s not a recognized pattern', () => {
    const string = '%s %d%y';
    const params = ['Discount', 10];
    const expected = 'Discount 10%y';

    const result = format(string, ...params);
    expect(result).toEqual(expected);
  });
});
