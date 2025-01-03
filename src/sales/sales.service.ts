import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale, SaleDocument } from './schemas/sale.schema';

@Injectable()
export class SalesService {
  public constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<SaleDocument>,
  ) {}

  /**
   * Creates a new sale.
   *
   * @param createSaleDto - The data transfer object containing sale details.
   * @returns The created sale.
   */
  public async createSale(createSaleDto: CreateSaleDto) {
    const total = createSaleDto.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    const createdSale = new this.saleModel({
      total,
      items: createSaleDto.items,
    });

    return createdSale.save();
  }

  /**
   * Retrieves all sales.
   *
   * @returns An array of all sales.
   */
  public async findAll() {
    return this.saleModel.find().populate('items').exec();
  }

  /**
   * Retrieves a single sale by ID.
   *
   * @param id - The ID of the sale.
   * @returns The sale with the specified ID.
   */
  public async findOne(id: string) {
    return this.saleModel.findById(id).populate('items').exec();
  }
}
