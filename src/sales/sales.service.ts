import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateSaleDto } from "../products/dto/create-sale.dto";

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(createSaleDto: CreateSaleDto) {
    const total = createSaleDto.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    return this.prisma.sale.create({
      data: {
        ...createSaleDto,
        total,
        items: {
          create: createSaleDto.items
        },
      },
    });
  }
}