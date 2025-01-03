import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  public constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.user.findMany({
      where: {
        isActive: isActive !== undefined ? isActive : undefined,
      },
      select: this.userSelect,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Retrieves a single user by ID.
   */
  public async findOne(id: string): Promise<Partial<User>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        ...this.userSelect,
        shifts: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            status: true,
          },
          take: 5,
          orderBy: { startTime: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
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
        const existingUser = await this.prisma.user.findUnique({
          where: { email: data.email },
        });
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException('Email already in use');
        }
      }

      return await this.prisma.user.update({
        where: { id },
        data,
        select: this.userSelect,
      });
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
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: this.userSelect,
    });
  }

  /**
   * Reactivates a user.
   */
  public async reactivate(id: string): Promise<Partial<User>> {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: { isActive: true },
      select: this.userSelect,
    });
  }
}
