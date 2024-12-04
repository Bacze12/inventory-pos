
import { Module } from '@nestjs/common';
//RUTA RAIZ
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsService } from '../src/products/products.service';
import { ProductsController } from '../src/products/products.controller';
import { SalesController } from './sales/sales.controller';
import { SalesService } from './sales/sales.service';
import { PrismaService } from '../prisma/prisma.service';


@Module({

  imports: [],

  controllers: [AppController,ProductsController, SalesController],

  providers: [
    AppService,
    ProductsService,
    PrismaService,
    SalesService,
  ],

})

export class AppModule {}
