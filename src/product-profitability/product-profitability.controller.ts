import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductProfitabilityService } from './product-profitability.service';
import { CreateProductProfitabilityDto } from './dto/create-product-profitability.dto';

@Controller('product-profitability')
export class ProductProfitabilityController {
  public constructor(private readonly service: ProductProfitabilityService) {}

  @Post()
  public create(@Body() dto: CreateProductProfitabilityDto) {
    return this.service.create(dto);
  }

  @Get()
  public findAll() {
    return this.service.findAll();
  }
}
