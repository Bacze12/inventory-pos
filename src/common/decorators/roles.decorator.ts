import { SetMetadata } from '@nestjs/common';
import { ROLES, Role } from '../../constants/roles';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@ValidatorConstraint({ async: false })
export class IsValidRoleConstraint implements ValidatorConstraintInterface {
  validate(role: any) {
    return Object.values(ROLES).includes(role);
  }

  defaultMessage() {
    return 'Role is not valid';
  }
}

export function IsValidRole(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidRoleConstraint,
    });
  };
}