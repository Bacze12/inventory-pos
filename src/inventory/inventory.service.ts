import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, InventoryDocument } from './schemas/inventory.schema';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class InventoryService {
  public constructor(
    @InjectModel(Inventory.name) private readonly inventoryModel: Model<InventoryDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  public async findAll() {
    return this.inventoryModel.find().populate('product').exec();
  }

  public async findOne(id: string) {
    const inventory = await this.inventoryModel.findById(id).populate('product').exec();

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    return inventory;
  }

  public async create(data: { productId: string; quantity: number; type: 'IN' | 'OUT'; notes?: string }) {
    const product = await this.productModel.findById(data.productId).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedStock = data.type === 'IN' ? product.stock + data.quantity : product.stock - data.quantity;

    if (updatedStock < 0) {
      throw new NotFoundException('Stock cannot be negative');
    }

    await this.productModel.findByIdAndUpdate(data.productId, { stock: updatedStock }).exec();

    const createdInventory = new this.inventoryModel(data);
    return createdInventory.save();
  }

  public async getProductWithInventory(productId: string) {
    return this.productModel.findById(productId).populate('inventory').exec();
  }

  public async update(id: string, data: { quantity?: number; type?: 'IN' | 'OUT'; notes?: string }) {
    const inventory = await this.inventoryModel.findById(id).exec();

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    if (data.quantity && data.type) {
      const product = await this.productModel.findById(inventory.productId).exec();

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const updatedStock = data.type === 'IN' ? product.stock + data.quantity : product.stock - data.quantity;

      if (updatedStock < 0) {
        throw new NotFoundException('Stock cannot be negative');
      }

      await this.productModel.findByIdAndUpdate(inventory.productId, { stock: updatedStock }).exec();
    }

    return this.inventoryModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public async remove(id: string) {
    const inventory = await this.inventoryModel.findById(id).exec();

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    return this.inventoryModel.findByIdAndDelete(id).exec();
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
    const product = await this.productModel.findOne({ sku }).exec();

    if (!product) {
      throw new NotFoundException('Product with the given SKU not found');
    }

    const updatedStock = type === 'IN' ? product.stock + quantity : product.stock - quantity;

    if (updatedStock < 0) {
      throw new NotFoundException('Stock cannot be negative');
    }

    await this.productModel.findByIdAndUpdate(product.id, { stock: updatedStock }).exec();

    const createdInventory = new this.inventoryModel({
      productId: product.id,
      quantity,
      type,
      notes,
    });
    return createdInventory.save();
  }
}
