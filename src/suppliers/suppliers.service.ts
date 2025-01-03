import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Suppliers')
@Injectable()
export class SuppliersService {
  public constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiResponse({ status: 201, description: 'Supplier created successfully' })
  @ApiResponse({ status: 500, description: 'Failed to create supplier' })
  public async create(createSupplierDto: CreateSupplierDto) {
    try {
      const data: Prisma.SupplierCreateInput = {
        name: createSupplierDto.name,
        address: createSupplierDto.address,
        phone: createSupplierDto.phone,
        email: createSupplierDto.email,
        isActive: createSupplierDto.isActive ?? true, // Establece un valor predeterminado
        updatedAt: new Date(), // Asigna explícitamente la fecha actual
      };
      return await this.prisma.supplier.create({ data });
    } catch (error) {
      this.logError('Error creating supplier:', error);
      throw new HttpException(
        'Failed to create supplier',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  

  @ApiOperation({ summary: 'Retrieve all suppliers' })
  @ApiResponse({ status: 200, description: 'Suppliers retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Failed to retrieve suppliers' })
  public async findAll() {
    try {
      return await this.prisma.supplier.findMany();
    } catch (error) {
      this.logError('Error retrieving suppliers:', error);
      throw new HttpException(
        'Failed to retrieve suppliers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private logError(message: string, error: any) {
    console.error(message, error);
  }

  @ApiOperation({ summary: 'Update a supplier' })
  @ApiResponse({ status: 200, description: 'Supplier updated successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  @ApiResponse({ status: 500, description: 'Failed to update supplier' })
  public async update(id: string, updateSupplierDto: Partial<CreateSupplierDto>) {
    try {
      const existingSupplier = await this.prisma.supplier.findUnique({
        where: { id },
      });
  
      if (!existingSupplier) {
        throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
      }
  
      const updatedSupplier = await this.prisma.supplier.update({
        where: { id },
        data: {
          ...updateSupplierDto,
          updatedAt: new Date(), // Actualiza la fecha de modificación
        },
      });
  
      return updatedSupplier;
    } catch (error) {
      this.logError('Error updating supplier:', error);
      throw new HttpException(
        'Failed to update supplier',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  

  @ApiOperation({ summary: 'Retrieve a supplier by ID' })
  @ApiResponse({ status: 200, description: 'Supplier retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  @ApiResponse({ status: 500, description: 'Failed to retrieve supplier' })
  public async findOne(id: string) {
    try {
      const supplier = await this.prisma.supplier.findUnique({
        where: { id },
      });
  
      if (!supplier) {
        throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
      }
  
      return supplier;
    } catch (error) {
      this.logError('Error retrieving supplier:', error);
      throw new HttpException(
        'Failed to retrieve supplier',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @ApiOperation({ summary: 'Activate or deactivate a supplier' })
  @ApiResponse({ status: 200, description: 'Supplier status updated successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  @ApiResponse({ status: 500, description: 'Failed to update supplier status' })
  public async toggleActiveStatus(id: string, isActive: boolean) {
    try {
      const existingSupplier = await this.prisma.supplier.findUnique({
        where: { id },
      });
  
      if (!existingSupplier) {
        throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
      }
  
      const updatedSupplier = await this.prisma.supplier.update({
        where: { id },
        data: {
          isActive,
          updatedAt: new Date(),
        },
      });
  
      return updatedSupplier;
    } catch (error) {
      this.logError('Error updating supplier status:', error);
      throw new HttpException(
        'Failed to update supplier status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  
}