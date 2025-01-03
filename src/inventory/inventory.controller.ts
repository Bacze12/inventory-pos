import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Param, 
    Body, 
    HttpException, 
    HttpStatus 
  } from '@nestjs/common';
  import { InventoryService } from './inventory.service';
  
  @Controller('inventory')
  export class InventoryController {
    public constructor(private readonly inventoryService: InventoryService) {}
  
    @Get()
    public async findAll() {
      try {
        return await this.inventoryService.findAll();
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get(':id')
    public async findOne(@Param('id') id: string) {
      try {
        const parsedId = String(id);
        
        return await this.inventoryService.findOne(parsedId);
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException('Error retrieving inventory item', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Post()
    public async create(@Body() body: any) {
      try {
        const { productId, quantity, type, notes } = body;
        if (!productId || !quantity || !type) {
          throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
        }
        return await this.inventoryService.create({
          productId,
          quantity,
          type,
          notes,
        });
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Patch(':id')
    public async update(@Param('id') id: string, @Body() body: any) {
      try {
        const parsedId = String(id);
        
        return await this.inventoryService.update(parsedId, body);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Delete(':id')
    public async remove(@Param('id') id: string) {
      try {
        const parsedId = String(id);
       
        return await this.inventoryService.remove(parsedId);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Post('movement')
    public async quickAdjust(@Body() body: any) {
      try {
        const { sku, quantity, type, notes } = body;
        if (!sku || !quantity || !type) {
          throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
        }
        return await this.inventoryService.registerMovement({
          sku,
          quantity,
          type,
          notes,
        });
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
  