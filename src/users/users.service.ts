import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  public constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private readonly userSelect = {
    id: true,
    email: true,
    name: true,
    role: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    password: false,
  };

  /**
   * Retrieves all users with optional filtering.
   */
  public async findAll(isActive?: boolean) {
    return this.userModel.find(
      {
        isActive: isActive !== undefined ? isActive : undefined,
      },
      this.userSelect,
    ).sort({ createdAt: -1 }).exec();
  }

  /**
   * Retrieves a single user by ID.
   */
  public async findOne(id: string): Promise<Partial<User>> {
    const user = await this.userModel.findById(id, {
      ...this.userSelect,
      shifts: {
        $slice: 5,
        $sort: { startTime: -1 },
        $project: {
          id: 1,
          startTime: 1,
          endTime: 1,
          status: 1,
        },
      },
    }).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user.toObject();
  }

  /**
   * Updates a user's information.
   */
  public async update(id: string, data: UpdateUserDto): Promise<Partial<User>> {
    try {
      // Verificar si el usuario existe
      await this.findOne(id);

      // Si se está actualizando el email, verificar que no exista
      if (data.email) {
        const existingUser = await this.userModel.findOne({ email: data.email }).exec();
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException('Email already in use');
        }
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true, select: this.userSelect }).exec();
      return updatedUser.toObject();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new Error('Failed to update user');
    }
  }

  /**
   * Deactivates a user.
   */
  public async deactivate(id: string): Promise<Partial<User>> {
    await this.findOne(id);
    const updatedUser = await this.userModel.findByIdAndUpdate(id, { isActive: false }, { new: true, select: this.userSelect }).exec();
    return updatedUser.toObject();
  }

  /**
   * Reactivates a user.
   */
  public async reactivate(id: string): Promise<Partial<User>> {
    await this.findOne(id);
    const updatedUser = await this.userModel.findByIdAndUpdate(id, { isActive: true }, { new: true, select: this.userSelect }).exec();
    return updatedUser.toObject();
  }
}
