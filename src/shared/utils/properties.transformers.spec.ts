import { TransformFnParams } from 'class-transformer/types/interfaces';

import { phoneNumberTransformer } from './properties.transformers';

describe('Properties Transformers utils services', () => {
  describe('phoneNumberTransformer util service', () => {
    it('should return a transformed phone number', () => {
      const expectedResult = '+38 (044) 123-45-67';
      const actualResult = phoneNumberTransformer({
        value: '+380441234567',
      } as TransformFnParams);

      expect(actualResult).toMatch(expectedResult);
    });
  });
});
