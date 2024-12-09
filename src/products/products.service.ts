import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    try {
      // Calcular precios si no se proporcionan
      const data = {
        ...createProductDto,
        sellingPrice: createProductDto.sellingPrice || 
          (createProductDto.purchasePrice * (1 + (createProductDto.marginPercent || 0))),
        finalPrice: createProductDto.finalPrice || 
          (createProductDto.sellingPrice * (createProductDto.isIvaExempt ? 1 : 1.19)),
      };

      return await this.prisma.product.create({
        data,
        include: {
          Category: true,
          Supplier: true,
        },
      });
    } catch (error) {
      this.logError('Error creating product:', error);
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(includeInactive: boolean = false) {
    try {
      return await this.prisma.product.findMany({
        where: {
          isActive: includeInactive ? undefined : true,
          deletedAt: null,
        },
        include: {
          Category: true,
          Supplier: true,
        },
      });
    } catch (error) {
      this.logError('Error retrieving products:', error);
      throw new HttpException(
        'Failed to retrieve products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          Category: true,
          Supplier: true,
          PriceHistory: {
            orderBy: { date: 'desc' },
            take: 5,
          },
          Inventory: {
            orderBy: { date: 'desc' },
            take: 5,
          },
        },
      });

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      return product;
    } catch (error) {
      this.logError('Error retrieving product:', error);
      throw error;
    }
  }

  public async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      // Verificar si el producto existe
      const existingProduct = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      // Si hay cambio en el precio, registrar en historial
      if (updateProductDto.price !== existingProduct.price) {
        await this.prisma.priceHistory.create({
          data: {
            productId: id,
            purchasePrice: updateProductDto.purchasePrice || existingProduct.purchasePrice,
            sellingPrice: updateProductDto.sellingPrice || existingProduct.sellingPrice,
            reason: 'Price update',
          },
        });
      }

      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
        include: {
          Category: true,
          Supplier: true,
        },
      });
    } catch (error) {
      this.logError('Error updating product:', error);
      throw error;
    }
  }

  public async remove(id: number) {
    try {
      // Soft delete
      return await this.prisma.product.update({
        where: { id },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      this.logError('Error deleting product:', error);
      throw error;
    }
  }

  private logError(message: string, error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, error);
    }
  }
}