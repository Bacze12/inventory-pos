import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift, ShiftDocument } from './schemas/shift.schema';

@Injectable()
export class ShiftService {
  public constructor(
    @InjectModel(Shift.name) private readonly shiftModel: Model<ShiftDocument>,
  ) {}

  public async create(data: CreateShiftDto) {
    const createdShift = new this.shiftModel(data);
    return createdShift.save();
  }

  public async findAll() {
    return this.shiftModel.find().exec();
  }
}
