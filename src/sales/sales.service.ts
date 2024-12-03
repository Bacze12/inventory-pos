import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async createSale(createSaleDto: CreateSaleDto) {
    const total = createSaleDto.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return this.prisma.sale.create({
      data: {
        total,
        items: {
          create: createSaleDto.items,
        },
      },
    });
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: {
        items: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }
}
