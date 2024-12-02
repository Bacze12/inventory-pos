import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../../common/decorators/roles.decorator";
import { Role } from "../../constants/roles";
import { AuthService } from "../../auth/auth.service";
import { PrismaService } from "prisma/prisma.service";
import { CreateSaleDto } from "src/products/dto/create-sale.dto";

// sales/sales.service.ts
@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(createSaleDto: CreateSaleDto) {
    const total = createSaleDto.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    return this.prisma.sale.create({
      data: {
        ...createSaleDto,
        total,
        items: {
          create: createSaleDto.items
        },
      },
    });
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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

