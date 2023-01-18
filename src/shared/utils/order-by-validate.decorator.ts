import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { OrderBy } from '@shared';

export function IsOrderBy(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isOrderBy',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          const sortBy: OrderBy[] = ['ASC', 'DESC'];
          return sortBy.includes(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            `${eachPrefix}$property must be a correct order by value`,
          validationOptions,
        ),
      },
    });
  };
}
