import { Controller, Post, Body, Get } from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';

@Controller('price-history')
export class PriceHistoryController {
  public constructor(private readonly service: PriceHistoryService) {}

  @Post()
  public create(@Body() dto: CreatePriceHistoryDto) {
    return this.service.create(dto);
  }

  @Get()
  public findAll() {
    return this.service.findAll();
  }
}
