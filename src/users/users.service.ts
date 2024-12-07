import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves all users.
   *
   * @returns An array of all users.
   */
  public async findAll(isActive?: boolean) {
    return this.prisma.user.findMany({
      where: {
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });
  }
  

  /**
   * Retrieves a single user by ID.
   *
   * @param id - The ID of the user.
   * @returns The user with the specified ID.
   */
  public async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  public async deactivate(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
  

  public async reactivate(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
  }
  
  
}
