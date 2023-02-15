import { TransformFnParams } from 'class-transformer/types/interfaces';

import { phoneNumberTransformer } from './properties.transformers';

describe('Properties Transformers utils services', () => {
  describe('phoneNumberTransformer util service', () => {
    const dataSet = [
      { input: '+380441234567', expectedOutput: '+38 (044) 123-45-67' },
      { input: '+380961234567', expectedOutput: '+38 (096) 123-45-67' },
      { input: '+38044321456', expectedOutput: '+38044321456' },
      { input: '0443214567', expectedOutput: '044321456' },
    ];

    it.each(dataSet)(
      'should return a transformed phone number',
      ({ input, expectedOutput }) => {
        const actualResult = phoneNumberTransformer({
          value: input,
        } as TransformFnParams);

        expect(actualResult).toMatch(expectedOutput);
      },
    );
  });
});
