import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCashDrawerDto } from './dto/create-cash-drawer.dto';
import { CashDrawer, CashDrawerDocument } from './schemas/cash-drawer.schema';

@Injectable()
export class CashDrawerService {
  public constructor(
    @InjectModel(CashDrawer.name) private readonly cashDrawerModel: Model<CashDrawerDocument>,
  ) {}

  public async create(data: CreateCashDrawerDto) {
    const createdCashDrawer = new this.cashDrawerModel(data);
    return createdCashDrawer.save();
  }

  public async findAll() {
    return this.cashDrawerModel.find().exec();
  }
}
