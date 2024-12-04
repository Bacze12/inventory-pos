import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new product.
   * 
   * @param createProductDto - The data transfer object containing product details.
   * @returns The created product.
   */
  public async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({ data: createProductDto });
    } catch (error) {
      console.error('Error creating product:', error);
      throw new HttpException('Failed to create product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Retrieves all products.
   * 
   * @returns An array of all products.
   */
  public async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      console.error('Error retrieving products:', error);
      throw new HttpException('Failed to retrieve products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Retrieves a single product by ID.
   * 
   * @param id - The ID of the product.
   * @returns The product with the specified ID.
   */
  public async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      console.error('Error retrieving product:', error);
      throw new HttpException('Failed to retrieve product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Updates a product.
   * 
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data transfer object containing updated product details.
   * @returns The updated product.
   */
  public async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new HttpException('Failed to update product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Deletes a product.
   * 
   * @param id - The ID of the product to delete.
   * @returns The deleted product.
   */
  public async remove(id: number) {
    try {
      const product = await this.prisma.product.delete({ where: { id } });
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new HttpException('Failed to delete product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
