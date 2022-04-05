import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  hasRole(roles: Role[], userRoles: Role[]) {
    return !!userRoles.find((role) => !!roles.find((item) => item === role));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && user.roles && this.hasRole(roles, user.roles);
  }
}
