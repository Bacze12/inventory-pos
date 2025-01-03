import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { PriceHistory, PriceHistoryDocument } from './schemas/price-history.schema';

@Injectable()
export class PriceHistoryService {
  public constructor(
    @InjectModel(PriceHistory.name) private readonly priceHistoryModel: Model<PriceHistoryDocument>,
  ) {}

  public async create(data: CreatePriceHistoryDto) {
    const createdPriceHistory = new this.priceHistoryModel(data);
    return createdPriceHistory.save();
  }

  public async findAll() {
    return this.priceHistoryModel.find().exec();
  }
}
