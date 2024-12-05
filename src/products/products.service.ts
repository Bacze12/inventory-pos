import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({ data: createProductDto });
    } catch (error) {
      console.error('Error creating product:', error);
      throw new HttpException('Failed to create product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      console.error('Error retrieving products:', error);
      throw new HttpException('Failed to retrieve products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  private logError(message: string, error: any) {
    if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
    }
  }
  public async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      console.error('Error retrieving product:', error);
      throw error; 
    }
  }

  public async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      if (error instanceof HttpException && error.message === 'Product not found') {
        throw error; // Deja que la excepción original pase
      }
      throw new HttpException('Failed to update product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async remove(id: number) {
    try {
      const product = await this.prisma.product.delete({ where: { id } });
      return product;
    } catch (error) {
      console.error('Error deleting product:', error);
      if (error instanceof HttpException && error.message === 'Product not found') {
        throw error; // Deja que la excepción original pase
      }
      throw new HttpException('Failed to delete product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
