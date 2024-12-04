import { Injectable } from '@nestjs/common';
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
    return this.prisma.product.create({ data: createProductDto });
  }

  /**
   * Retrieves all products.
   * 
   * @returns An array of all products.
   */
  public async findAll() {
    return this.prisma.product.findMany();
  }

  /**
   * Retrieves a single product by ID.
   * 
   * @param id - The ID of the product.
   * @returns The product with the specified ID.
   */
  public async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  /**
   * Updates a product.
   * 
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data transfer object containing updated product details.
   * @returns The updated product.
   */
  public async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  /**
   * Deletes a product.
   * 
   * @param id - The ID of the product to delete.
   * @returns The deleted product.
   */
  public async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
