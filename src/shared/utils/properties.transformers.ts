import { TransformFnParams } from 'class-transformer/types/interfaces';

export const phoneNumberTransformer = (params: TransformFnParams): string => {
  const phoneRegex = /^(\+38)(\d{3})(\d{3})(\d{2})(\d{2})$/;
  const phone = params.value as string;

  return phoneRegex.test(phone)
    ? phone.replace(phoneRegex, '$1 ($2) $3-$4-$5')
    : phone;
};
