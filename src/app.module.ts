
import { Module } from '@nestjs/common';
import { ProductsService } from '../src/products/products.service';
import { ProductsController } from '../src/products/products.controller';
import { SalesController } from './sales/sales.controller';
import { SalesService } from './sales/sales.service';
import { PrismaService } from '../prisma/prisma.service';


@Module({

  imports: [],

  controllers: [ProductsController, SalesController],

  providers: [
    ProductsService,
    PrismaService,
    SalesService,
  ],

})

export class AppModule {}
