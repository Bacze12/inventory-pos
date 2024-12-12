import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  public constructor(private readonly prisma: PrismaService) {}

  public calculatePrices(purchasePrice: number, marginPercent: number, isIvaExempt: boolean, hasExtraTax: boolean, extraTaxRate?: number) {
    // Calcular precio de venta base (con margen)
    const marginMultiplier = 1 + (marginPercent / 100);
    const sellingPrice = purchasePrice * marginMultiplier;
    
    // Calcular precio mínimo (con margen mínimo del 10%)
    const minMarginMultiplier = 1 + 0.10; // 10% de margen mínimo
    const minSellingPrice = purchasePrice * minMarginMultiplier;
    
    // Calcular precio con IVA
    let finalPrice = sellingPrice;
    if (!isIvaExempt) {
      finalPrice *= 1.19; // 19% IVA
    }
    
    // Añadir impuesto adicional si aplica
    if (hasExtraTax && extraTaxRate) {
      finalPrice *= (1 + (extraTaxRate / 100));
    }

    return {
      sellingPrice: Number(sellingPrice.toFixed(2)),
      minSellingPrice: Number(minSellingPrice.toFixed(2)),
      finalPrice: Number(finalPrice.toFixed(2))
    };
  }

  public async create(createProductDto: CreateProductDto) {
    try {
      const {
        purchasePrice,
        marginPercent,
        isIvaExempt,
        hasExtraTax,
        extraTaxRate
      } = createProductDto;

      // Calcular todos los precios
      const calculatedPrices = this.calculatePrices(
        purchasePrice,
        marginPercent,
        isIvaExempt,
        hasExtraTax,
        extraTaxRate
      );

      // Crear el producto con todos los precios calculados
      const { categoryId, supplierId, ...restData } = createProductDto;
      const data = {
        ...restData,
        ...calculatedPrices,
        Category: { connect: { id: categoryId } },
        Supplier: { connect: { id: supplierId } }
      };

      const product = await this.prisma.product.create({
        data,
        include: {
          Category: true,
          Supplier: true,
        },
      });

      // Registrar en el historial de precios
      await this.prisma.priceHistory.create({
        data: {
          productId: product.id,
          purchasePrice: purchasePrice,
          sellingPrice: calculatedPrices.sellingPrice,
          reason: 'Initial price setting',
        },
      });

      return product;
    } catch (error) {
      console.error('Error creating product:', error);
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
      const existingProduct = await this.prisma.product.findUnique({
        where: { id },
      });
  
      if (!existingProduct) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
  
      const { categoryId, supplierId, ...restData } = updateProductDto;
      let updatedData: any = { ...restData };
  
      // Manejar las relaciones si se proporcionan
      if (categoryId) {
        updatedData.Category = { connect: { id: categoryId } };
      }
      if (supplierId) {
        updatedData.Supplier = { connect: { id: supplierId } };
      }
  
      // Recalcular precios si es necesario
      if (updateProductDto.purchasePrice || updateProductDto.marginPercent) {
        const calculatedPrices = this.calculatePrices(
          updateProductDto.purchasePrice || existingProduct.purchasePrice,
          updateProductDto.marginPercent || existingProduct.marginPercent,
          updateProductDto.isIvaExempt ?? existingProduct.isIvaExempt,
          updateProductDto.hasExtraTax ?? existingProduct.hasExtraTax,
          updateProductDto.extraTaxRate ?? existingProduct.extraTaxRate
        );
  
        updatedData = {
          ...updatedData,
          ...calculatedPrices
        };
  
        await this.prisma.priceHistory.create({
          data: {
            productId: id,
            purchasePrice: updatedData.purchasePrice,
            sellingPrice: calculatedPrices.sellingPrice,
            reason: 'Price update',
          },
        });
      }
  
      return await this.prisma.product.update({
        where: { id },
        data: updatedData,
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