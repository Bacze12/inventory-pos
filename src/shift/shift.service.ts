import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';

@Injectable()
export class ShiftService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(data: CreateShiftDto) {
    return this.prisma.shift.create({ data });
  }

  public async findAll() {
    return this.prisma.shift.findMany();
  }
}
