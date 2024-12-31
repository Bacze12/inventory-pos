import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SchemaMiddleware implements NestMiddleware {
    public constructor(private readonly prisma: PrismaService) {}

    public async use(req: any, res: any, next: () => void) {
        const schema = `client_${req.clientId}`;
        await this.prisma.$executeRawUnsafe(`SET search_path TO ${schema}`);
        next();
    }
}