import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'specialCharacter', async: false })
export class SpecialCharacterConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value !== 'string') {
      return false;
    }
    // Kiểm tra xem chuỗi có chứa ký tự đặc biệt không
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return !regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'The string does not contain special characters';
  }
}

export function DoesNotContainSpecialCharacter(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: SpecialCharacterConstraint,
    });
  };
}