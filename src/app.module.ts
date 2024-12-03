
import { Module } from '@nestjs/common';
import { ProductsService } from '../src/products/products.service';
import { ProductsController } from '../src/products/products.controller';


@Module({

  imports: [],

  controllers: [ProductsController],

  providers: [ProductsService],

})

export class AppModule {}
