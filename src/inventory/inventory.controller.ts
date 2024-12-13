import { Controller, Get, Post, Patch, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  public constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  public async findAll() {
    try {
      return await this.inventoryService.findAll();
    } catch {
      throw new HttpException('Error retrieving inventory', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: number) {
    try {
      return await this.inventoryService.findOne(id);
    } catch {
      throw new HttpException('Inventory item not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  public async create(@Body() body: any) {
    try {
      return await this.inventoryService.create(body);
    } catch {
      throw new HttpException('Error creating inventory item', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  public async update(@Param('id') id: number, @Body() body: any) {
    try {
      return await this.inventoryService.update(id, body);
    } catch {
      throw new HttpException('Error updating inventory item', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: number) {
    try {
      return await this.inventoryService.remove(id);
    } catch {
      throw new HttpException('Error deleting inventory item', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('movement')
  public async quickAdjust(@Body() body: any) {
    try {
      return await this.inventoryService.registerMovement(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
