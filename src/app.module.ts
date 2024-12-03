
import { Module } from '@nestjs/common';
import { ProductsService } from '../src/products/products.service';
import { ProductsController } from '../src/products/products.controller';
import { PrismaService } from '../prisma/prisma.service';


@Module({

  imports: [],

  controllers: [ProductsController],

  providers: [ProductsService,
    PrismaService,
  ],

})

export class AppModule {}
