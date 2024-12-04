import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new sale.
   * 
   * @param createSaleDto - The data transfer object containing sale details.
   * @returns The created sale.
   */
  public async createSale(createSaleDto: CreateSaleDto) {
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

  /**
   * Retrieves all sales.
   * 
   * @returns An array of all sales.
   */
  public async findAll() {
    return this.prisma.sale.findMany({
      include: {
        items: true,
      },
    });
  }

  /**
   * Retrieves a single sale by ID.
   * 
   * @param id - The ID of the sale.
   * @returns The sale with the specified ID.
   */
  public async findOne(id: number) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }
}
