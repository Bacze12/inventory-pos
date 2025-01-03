import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';

@Controller('dashboard')
export class DashboardController {
  public constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @Get('/dashboard')
  public async getDashboard() {
    const collections = await this.userModel.db.db
      .listCollections()
      .toArray();
    return { message: `Colecciones actuales: ${collections.map((col) => col.name).join(', ')}` };
  }
}
