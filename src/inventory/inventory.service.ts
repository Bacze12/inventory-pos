import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InventoryService {
  public constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    return this.prisma.inventory.findMany({
      include: { Product: true },
    });
  }

  public async findOne(id: number) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id },
      include: { Product: true },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    return inventory;
  }

  public async create(data: { productId: number; quantity: number; type: 'IN' | 'OUT'; notes?: string }) {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });
  
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    const updatedStock = data.type === 'IN' ? product.stock + data.quantity : product.stock - data.quantity;
  
    if (updatedStock < 0) {
      throw new NotFoundException('Stock cannot be negative');
    }
  
    await this.prisma.product.update({
      where: { id: data.productId },
      data: { stock: updatedStock },
    });
  
    return this.prisma.inventory.create({
      data,
    });
  }
  public async getProductWithInventory(productId: number) {
    return this.prisma.product.findUnique({
      where: { id: productId },
      include: { Inventory: true },
    });
  }
  

  public async update(id: number, data: { quantity?: number; type?: 'IN' | 'OUT'; notes?: string }) {
    const inventory = await this.prisma.inventory.findUnique({ where: { id } });
  
    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }
  
    if (data.quantity && data.type) {
      const product = await this.prisma.product.findUnique({
        where: { id: inventory.productId },
      });
  
      if (!product) {
        throw new NotFoundException('Product not found');
      }
  
      const updatedStock =
        data.type === 'IN'
          ? product.stock + data.quantity
          : product.stock - data.quantity;
  
      if (updatedStock < 0) {
        throw new NotFoundException('Stock cannot be negative');
      }
  
      await this.prisma.product.update({
        where: { id: inventory.productId },
        data: { stock: updatedStock },
      });
    }
  
    return this.prisma.inventory.update({
      where: { id },
      data,
    });
  }
  
  

  public async remove(id: number) {
    const inventory = await this.prisma.inventory.findUnique({ where: { id } });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    return this.prisma.inventory.delete({ where: { id } });
  }

  public async registerMovement({
    sku,
    quantity,
    type,
    notes,
  }: {
    sku: string;
    quantity: number;
    type: 'IN' | 'OUT';
    notes?: string;
  }) {
    const product = await this.prisma.product.findFirst({
        where: { sku },
      });
      

    if (!product) {
      throw new NotFoundException('Product with the given SKU not found');
    }

    const updatedStock = type === 'IN' ? product.stock + quantity : product.stock - quantity;

    if (updatedStock < 0) {
      throw new NotFoundException('Stock cannot be negative');
    }

    await this.prisma.product.update({
      where: { id: product.id },
      data: { stock: updatedStock },
    });

    return this.prisma.inventory.create({
      data: {
        productId: product.id,
        quantity,
        type,
        notes,
      },
    });
  }
}
