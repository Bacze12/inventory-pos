import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('dashboard')
export class DashboardController {
    public constructor(private prisma: PrismaService) {}
    @Get('/dashboard')
    public async getDashboard() {
        const collections = await this.prisma.$runCommandRaw({ listCollections: 1 });
        return { message: `Colecciones actuales: ${collections}` };
        }


}
