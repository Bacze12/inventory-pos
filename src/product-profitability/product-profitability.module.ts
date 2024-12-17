import { Module } from '@nestjs/common';
import { ProductProfitabilityController } from './product-profitability.controller';
import { ProductProfitabilityService } from './product-profitability.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductProfitabilityController],
  providers: [ProductProfitabilityService],
  exports: [ProductProfitabilityService],
})
export class profitabilityModule {}
