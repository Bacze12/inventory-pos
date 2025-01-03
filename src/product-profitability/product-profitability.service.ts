import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductProfitabilityDto } from './dto/create-product-profitability.dto';
import { ProductProfitability, ProductProfitabilityDocument } from './schemas/product-profitability.schema';

@Injectable()
export class ProductProfitabilityService {
  public constructor(
    @InjectModel(ProductProfitability.name) private readonly productProfitabilityModel: Model<ProductProfitabilityDocument>,
  ) {}

  public async create(data: CreateProductProfitabilityDto) {
    const createdProductProfitability = new this.productProfitabilityModel(data);
    return createdProductProfitability.save();
  }

  public async findAll() {
    return this.productProfitabilityModel.find().exec();
  }
}
