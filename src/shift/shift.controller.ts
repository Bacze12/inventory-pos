import { Controller, Post, Body, Get } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';

@Controller('shifts')
export class ShiftController {
  public constructor(private readonly service: ShiftService) {}

  @Post()
  public create(@Body() dto: CreateShiftDto) {
    return this.service.create(dto);
  }

  @Get()
  public findAll() {
    return this.service.findAll();
  }
}
