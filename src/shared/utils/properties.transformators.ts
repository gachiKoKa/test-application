import { TransformFnParams } from 'class-transformer/types/interfaces';

export const phoneNumberTransformer = (params: TransformFnParams): string => {
  const phone = params.value as string;

  return phone.replace(
    /(\+38)(\d{3})(\d{3})(\d{2})(\d{2})/g,
    '$1 ($2) $3-$4-$5',
  );
};
