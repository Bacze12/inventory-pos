import { SetMetadata } from '@nestjs/common';
import { ROLES, Role } from '../../constants/roles';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@ValidatorConstraint({ async: false })
export class IsValidRoleConstraint implements ValidatorConstraintInterface {
  public validate(role: any): boolean {
    return Object.values(ROLES).includes(role);
  }

  public defaultMessage(): string {
    return 'Role is not valid';
  }
}

export function IsValidRole(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidRole',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return Object.values(ROLES).includes(value);
        },
        defaultMessage(): string {
          return 'Invalid role';
        },
      },
    });
  };
}
