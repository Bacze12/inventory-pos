import { Module } from '@nestjs/common';
import { CashDrawerService } from './cash-drawer.service';
import { CashDrawerController } from './cash-drawer.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CashDrawerController],
  providers: [CashDrawerService],
  exports: [CashDrawerService],
})
export class CashDrawerModule {}
