import { Controller, Post, Body, Get } from '@nestjs/common';
import { CashDrawerService } from './cash-drawer.service';
import { CreateCashDrawerDto } from './dto/create-cash-drawer.dto';

@Controller('cash-drawer')
export class CashDrawerController {
  public constructor(private readonly service: CashDrawerService) {}

  @Post()
  public create(@Body() dto: CreateCashDrawerDto) {
    return this.service.create(dto);
  }

  @Get()
  public findAll() {
    return this.service.findAll();
  }
}
