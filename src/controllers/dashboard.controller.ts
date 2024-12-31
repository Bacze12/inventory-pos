import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('dashboard')
export class DashboardController {
    public constructor(private prisma: PrismaService) {}
    @Get('/dashboard')
    public async getDashboard() {
        const schema = await this.prisma.$executeRawUnsafe('SELECT current_schema()');
        return { message: `Esquema actual: ${schema}` };
    }

}
