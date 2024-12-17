import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';

@Injectable()
export class PriceHistoryService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(data: CreatePriceHistoryDto) {
    return this.prisma.priceHistory.create({ data });
  }

  public async findAll() {
    return this.prisma.priceHistory.findMany();
  }
}
