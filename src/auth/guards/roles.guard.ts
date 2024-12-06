import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { Role } from '../../constants/roles';
import { AuthService } from '../../auth/auth.service';

/**
 * Guard to handle role-based access control.
 * This guard checks if the user has the required roles to access a route.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  /**
   * Determines if the current user has the required roles to access the route.
   *
   * @param context - The execution context of the request.
   * @returns {Promise<boolean>} - True if the user has the required roles, otherwise false.
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userRoles = await this.authService.getUserRoles(user.id);
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
