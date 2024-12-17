import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCashDrawerDto } from './dto/create-cash-drawer.dto';

@Injectable()
export class CashDrawerService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(data: CreateCashDrawerDto) {
    return this.prisma.cashDrawer.create({ data });
  }

  public async findAll() {
    return this.prisma.cashDrawer.findMany();
  }
}
