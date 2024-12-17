import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  @Post()
@ApiOperation({ summary: 'Create a new product' })
@ApiResponse({ status: 201, description: 'Product created successfully' })
public async create(@Body() createProductDto: CreateProductDto) {
  if (!createProductDto.categoryId || !createProductDto.supplierId) {
    throw new HttpException('CategoryId y SupplierId son obligatorios', HttpStatus.BAD_REQUEST);
  }
  return this.productsService.create(createProductDto);
}


  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean })
  public async findAll(@Query('includeInactive') includeInactive?: boolean) {
    return this.productsService.findAll(includeInactive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single product by ID' })
  public async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  public async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a product' })
  public async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Post('preview')
@ApiOperation({ summary: 'Preview calculated product prices' })
public async preview(@Body() createProductDto: CreateProductDto) {
  const calculatedPrices = this.productsService.calculatePrices(
    createProductDto.purchasePrice,
    createProductDto.marginPercent,
    createProductDto.isIvaExempt,
    createProductDto.hasExtraTax,
    createProductDto.extraTaxRate,
  );
  return calculatedPrices;
}

}
