import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  public constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  public async create(@Body() createSupplierDto: CreateCategorieDto) {
    return this.categoriesService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories' })
  public async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  public async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  public async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: Partial<CreateCategorieDto>,
  ) {
    return this.categoriesService.update(Number(id), updateSupplierDto);
  }

  @Patch(':id/active')
  @ApiOperation({ summary: 'Activate or deactivate a category' })
  @ApiResponse({ status: 200, description: 'Category status updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  public async toggleActiveStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean, // Recibe el nuevo estado
  ) {
    return this.categoriesService.toggleActiveStatus(Number(id), isActive);
  }
}