import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplierModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';
import { InventoryModule } from './inventory/inventory.module';
import { CashDrawerModule } from './cash-drawer/cash-drawer.module';
import { PriceHistoryModule } from './price-history/price-history.module';
import { profitabilityModule } from './product-profitability/product-profitability.module';
import { ShiftModule } from './shift/shift.module';
@Module({
  imports: [AuthModule, PrismaModule, UsersModule, ProductsModule, SalesModule, SupplierModule, CategoriesModule, InventoryModule, CashDrawerModule, PriceHistoryModule, profitabilityModule, ShiftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
