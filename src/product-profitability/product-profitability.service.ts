import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductProfitabilityDto } from './dto/create-product-profitability.dto';

@Injectable()
export class ProductProfitabilityService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(data: CreateProductProfitabilityDto) {
    return this.prisma.productProfitability.create({ data:{...data, productId:String(data.productId),}, });
  }

  public async findAll() {
    return this.prisma.productProfitability.findMany();
  }
}
