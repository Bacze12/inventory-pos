import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SchemaMiddleware implements NestMiddleware {
    public constructor(private readonly prisma: PrismaService) {}

    public async use(req: any, res: any, next: () => void) {
        req.schema = `client_${req.clientId}`; // Almacena el esquema como parte del objeto `req`.
        next();
      }
      
}