import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Controller for handling product-related operations.
 * This controller provides endpoints for creating, retrieving, updating, and deleting products.
 */
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Creates a new product.
   * 
   * @param createProductDto - The data transfer object containing product details.
   * @returns The created product.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  public async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  /**
   * Retrieves all products.
   * 
   * @returns An array of all products.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  public async findAll() {
    return this.productsService.findAll();
  }

  /**
   * Retrieves a single product by ID.
   * 
   * @param id - The ID of the product.
   * @returns The product with the specified ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single product by ID' })
  public async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  /**
   * Updates a product.
   * 
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data transfer object containing updated product details.
   * @returns The updated product.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  public async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  /**
   * Deletes a product.
   * 
   * @param id - The ID of the product to delete.
   * @returns The deleted product.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  public async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
